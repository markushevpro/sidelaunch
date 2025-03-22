import { useCallback, useEffect, useMemo } from 'react'

import type { Screen }   from './types'
import type * as runtime from 'wailsjs/runtime/runtime'

import { TARGET_WINDOW_SIZE, MAGIC_OFFSET } from './const'
import { useWindowStore }                   from './store'

interface HWindowOffset
{
    fix: number
    visible: number
    hidden: number
}

export
function useWindowOffset
(): HWindowOffset
{
    const { onPlace, offset, dpi, update } = useWindowStore()

    const searchScreen = useCallback(
        (): void => {
            if ( onPlace ) {
                return
            }

            let current = screen.availLeft

            // TODO: Refactor?
            const testScreen = (): void => {
                window.runtime.WindowSetPosition( -TARGET_WINDOW_SIZE, 0 )
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                setTimeout(() => {
                    const next = screen.availLeft

                    if ( current === next ) {
                        window.runtime.WindowSetSize( TARGET_WINDOW_SIZE, screen.availHeight )
                        update({ onPlace: true })
                        return
                    }

                    current = next
                    testScreen()
                }, 500 )
            }

            testScreen()
        },
        [ onPlace, update ]
    )

    useEffect(
        () => { searchScreen() },
        [ searchScreen ]
    )

    useEffect(
        () => {
            if ( !onPlace ) {
                const fixOffset = async (): Promise<void> => {
                    const screens = await window.runtime.ScreenGetAll()

                    const screen = screens.find(( s: runtime.Screen ) => s.isCurrent ) as unknown as Screen
                    const dpi    = ( screen.physicalSize?.width ?? screen.size.width ) / screen.size.width
                    const fix    = 0 // Math.round( TARGET_WINDOW_SIZE / dpi - window.innerWidth )

                    window.runtime.WindowSetPosition( fix - TARGET_WINDOW_SIZE * dpi + MAGIC_OFFSET, 0 )

                    update({
                        offset: fix,
                        dpi
                    })
                }

                void fixOffset()
            }
        },
        [ onPlace, update ]
    )

    return useMemo(
        () => ({
            fix:     offset / dpi,
            visible: offset,
            hidden:  offset - TARGET_WINDOW_SIZE * dpi + MAGIC_OFFSET
        }),
        [ dpi, offset ]
    )
}
