import { useCallback, useRef }             from 'react'
import { useConfig }                       from 'src/@/services/config/hook'
import { useHookResult }                   from 'src/@/shared/hooks/useHookResult'
import { WindowCenter, WindowSetPosition } from 'wailsjs/runtime/runtime'

import { useWindowStore }  from './store'
import { useWindowOffset } from './useWindowOffset'

interface RWindowPosition
{
    offset: number
    center: () => Promise<void>,
    reset: () => void
    show: () => void
    hide: () => void
}

export
function useWindow
(): RWindowPosition
{
    const { config }          = useConfig()
    const timer               = useRef<ReturnType<typeof setTimeout>>()
    const offset              = useWindowOffset()
    const { visible, update } = useWindowStore()

    const center = useCallback(
        async () => {
            const details = await window.getScreenDetails()

            if ( details ) {
                if ( details.currentScreen.isPrimary ) {
                    WindowCenter()
                } else {
                    if ( details.currentScreen.left < 0 ) {
                        WindowSetPosition( details.currentScreen.width * details.currentScreen.devicePixelRatio + 1, 0 )
                    } else if ( details.currentScreen.left > 0 ) {
                        WindowSetPosition( -1, 0 )
                    }

                    setTimeout(() => void center(), 10 )
                }
            }
        },
        []
    )

    const reset = useCallback(
        () => {
            update({ onPlace: false })
        },
        [ update ]
    )

    const hide = useCallback(
        (): void => {
            window.runtime.WindowSetPosition( offset.hidden, 0 )
            update({ visible: false })
        },
        [ offset.hidden, update ]
    )

    const hideTimeout = useCallback(
        () => {
            if ( visible ) {
                if ( timer.current ) {
                    clearTimeout( timer.current )
                }

                timer.current = setTimeout( hide, config.hideTimeout * 1000 )
            }
        },
        [ config.hideTimeout, hide, visible ]
    )

    const show = useCallback(
        (): void => {
            if ( timer.current ) {
                clearTimeout( timer.current )
            }

            if ( !visible ) {
                window.runtime.WindowSetPosition( offset.visible, 0 )
                update({ visible: true })
            }
        },
        [ offset.visible, update, visible ]
    )

    return useHookResult({
        center,
        reset,
        show,
        hide:   hideTimeout,
        offset: offset.fix
    })
}
