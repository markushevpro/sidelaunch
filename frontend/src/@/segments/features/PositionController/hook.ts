/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from 'react'
import { useConfig }                        from 'src/@/services/config/hook'
import { useKeyboardCatcher }               from 'src/@/services/keyboard/useKeyboardCatcher'
import { useLibrary }                       from 'src/@/services/library/hook'
import { useWindow }                        from 'src/@/services/window/hook'
import { useWindowStore }                   from 'src/@/services/window/store'
import { useHookResult }                    from 'src/@/shared/hooks/useHookResult'

import type { DragEvent, MouseEvent } from 'react'

interface HPositionController
{
    show: ( e: any ) => void
    hide: ( e: any ) => void
    hideOut: ( e: any ) => void
}

export
function usePositionController
(): HPositionController
{
    const { config }           = useConfig()
    const { hide, show }       = useWindow()
    const { onPlace, visible } = useWindowStore()
    const { library }          = useLibrary()

    const [ shown, $shown ] = useState<boolean>( false )

    const hideOut = useKeyboardCatcher<DragEvent>(
        useCallback(
            ( e: DragEvent ) => {
                if ( e.pageX > window.innerWidth ) {
                    hide()
                }
            },
            [ hide ]
        )
    )

    const mHide = useKeyboardCatcher<MouseEvent>( hide )
    const mShow = useKeyboardCatcher<MouseEvent>( show )

    useEffect(
        () => {
            if ( library && onPlace && !shown ) {
                $shown( true )
                show()
                setTimeout(() => { hide() }, config.hideTimeout * 1000 )
            }
        },
        [ library, shown, onPlace, visible, hide, show, config.hideTimeout ]
    )

    return useHookResult({
        show: mShow,
        hide: mHide,
        hideOut
    })
}
