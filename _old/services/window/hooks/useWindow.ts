import { useCallback, useMemo, useRef } from 'react'

import { useWindowOffset } from './useWindowOffset'

interface RWindowPosition
{
    offset: number
    show: () => void
    hide: () => void
}

export
function useWindow
(): RWindowPosition
{
    const timer  = useRef<number>()
    const offset = useWindowOffset()

    const hide = useCallback(
        (): void => {
            window.runtime.WindowSetPosition( offset.hidden, 0 )
        },
        [ offset ]
    )

    const hideTimeout = useCallback(
        () => {
            if ( timer.current ) {
                clearTimeout( timer.current )
            }

            timer.current = setTimeout( hide, 1000 )
        },
        [ hide ]
    )

    const show = useCallback(
        (): void => {
            window.runtime.WindowSetPosition( offset.visible, 0 )

            if ( timer.current ) {
                clearTimeout( timer.current )
            }
        },
        [ offset ]
    )
    return useMemo(
        () => ({
            show,
            hide:   hideTimeout,
            offset: offset.visible
        }),
        [ offset, show, hideTimeout ]
    )
}
