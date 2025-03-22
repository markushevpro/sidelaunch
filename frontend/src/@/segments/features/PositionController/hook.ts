/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback }        from 'react'
import { useKeyboardCatcher } from 'src/@/services/keyboard/useKeyboardCatcher'
import { useWindow }          from 'src/@/services/window/hook'
import { useHookResult }      from 'src/@/shared/hooks/useHookResult'

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
    const { hide, show } = useWindow()

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

    return useHookResult({
        show: mShow,
        hide: mHide,
        hideOut
    })
}
