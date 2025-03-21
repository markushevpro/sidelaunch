import { useCallback }        from 'react'
import { useKeyboardCatcher } from 'src/@/services/keyboard/useKeyboardCatcher'
import { useWindow }          from 'src/@/services/window/hook'

import type { PropsWithChildren, DragEvent, MouseEvent } from 'react'

import styles from './position-controller.module.css'

type PPositionController = PropsWithChildren

export
function PositionController
({ children }: PPositionController )
{
    const { hide, show } = useWindow()

    const hideIfOut = useKeyboardCatcher<DragEvent>(
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

    return (
        <main
            className={styles.container}
            // style={{ paddingLeft: -offset }}
            onDragEnd={hideIfOut}
            onDragLeave={hideIfOut}
            onDragOver = {mShow}
            onMouseEnter = {mShow}
            onMouseLeave = {mHide}
            onMouseMove={mShow}
        >
            { children }
        </main>
    )
}
