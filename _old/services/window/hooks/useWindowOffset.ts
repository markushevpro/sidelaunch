import { useCallback, useEffect, useMemo, useState } from 'react'

import { MAGIC_OFFSET, TARGET_WINDOW_SIZE } from '..'

import type { IScreen }  from '..'
import type * as runtime from '@/../wailsjs/runtime/runtime'

interface HWindowOffset
{
    visible: number
    hidden: number
}

export
function useWindowOffset
(): HWindowOffset
{
    const [ offset, $offset ]   = useState<number>( 0 )
    const [ dpi, $dpi ]         = useState<number>( 1 )
    const [ onPlace, $onPlace ] = useState<boolean>( false )

    const searchScreen = useCallback(
        (): void => {
            if ( onPlace ) {
                return
            }

            let current = screen.availLeft

            const testScreen = (): void => {
                window.runtime.WindowSetPosition( -100, 0 )
                setTimeout( async () => {
                    const next = screen.availLeft

                    if ( current === next ) {
                        await window.runtime.WindowSetSize( TARGET_WINDOW_SIZE, screen.availHeight )
                        $onPlace( true )
                        return
                    }

                    current = next
                    testScreen()
                }, 500 )
            }

            testScreen()
        },
        [ onPlace ]
    )

    useEffect(() => {
        searchScreen()
    }, [ searchScreen ])

    useEffect(() => {
        const fixOffset = async (): Promise<void> => {
            const screens = await window.runtime.ScreenGetAll()

            const screen = screens.find(( s: runtime.Screen ) => s.isCurrent ) as unknown as IScreen
            const dpi    = screen.physicalSize.width / screen.size.width
            const fix    = Math.round( TARGET_WINDOW_SIZE / dpi - window.innerWidth )

            window.runtime.WindowSetPosition( fix - TARGET_WINDOW_SIZE * dpi + MAGIC_OFFSET, 0 )

            $offset( fix )
            $dpi( dpi )
        }

        void fixOffset()
    }, [ onPlace ])

    return useMemo(
        () => ({
            visible: offset,
            hidden:  offset - TARGET_WINDOW_SIZE * dpi + MAGIC_OFFSET
        }),
        [ dpi, offset ]
    )
}
