/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from 'react'

import { useConfig }          from 'src/@/services/config/hook'
import { useDnDStore }        from 'src/@/services/dnd/store'
import { useKeyboardCatcher } from 'src/@/services/keyboard/useKeyboardCatcher'
import { useLibrary }         from 'src/@/services/library/hook'
import { useWindow }          from 'src/@/services/window/hook'
import { useWindowStore }     from 'src/@/services/window/store'
import { useHookResult }      from 'src/@/shared/hooks/useHookResult'

import type { DragEvent, MouseEvent } from 'react'

interface HPositionController
{
    drop: boolean
    show: ( e: any ) => void
    hide: ( e: any ) => void
    dropShow: ( e: any ) => void
    dropHide: ( e: any ) => void
}

export
function usePositionController
(): HPositionController
{
    const { config }                         = useConfig()
    const { hide, show }                     = useWindow()
    const { onPlace, visible, drop, update } = useWindowStore()
    const { dragged }                        = useDnDStore()
    const { library }                        = useLibrary()

    const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>( null )

    const [ shown, $shown ] = useState<boolean>( false )

    const clearHideTimeout = useCallback(
        () => {
            if ( hideTimeout.current ) {
                clearTimeout( hideTimeout.current )
            }
        },
        []
    )

    const hoverHide = useKeyboardCatcher<MouseEvent>(
        useCallback(
            () => {
                hide()
            },
            [ hide ]
        )
    )

    const hoverShow = useKeyboardCatcher<MouseEvent>( show )

    const dropShow = useCallback(
        ( e: DragEvent ) => {
            if ( !dragged ) {
                clearHideTimeout()
                update({ drop: true })
                hoverShow( e )
            }
        },
        [ dragged, hoverShow, update, clearHideTimeout ]
    )

    const dropHide = useCallback(
        ( e: DragEvent ) => {
            if ( !dragged ) {
                clearHideTimeout()

                hideTimeout.current = setTimeout(() => {
                    update({ drop: false })

                    if ( e.pageX > window.innerWidth ) {
                        hoverHide( e )
                    }
                }, 10 )
            }
        },
        [ dragged, hoverHide, update, clearHideTimeout ]
    )

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


    useEffect(
        () => {
            const watcher = ([ _, what ]: string[]): void => {
                if ( what === 'show' ) {
                    show()
                }

                if ( what === 'hide' ) {
                    hide()
                }
            }

            window.runtime.EventsOn( 'reload', watcher )

            return () => {
                window.runtime.EventsOff( 'reload' )
            }
        },
        [ show, hide  ]
    )

    return useHookResult({
        drop,
        dropShow,
        dropHide,
        show: hoverShow,
        hide: hoverHide
    })
}
