import type { PropsWithChildren } from 'react'

import { usePositionController } from './hook'
import styles                    from './position-controller.module.css'

type PPositionController = PropsWithChildren

export
function PositionController
({ children }: PPositionController )
{
    const { show, hide, hideOut } = usePositionController()

    return (
        <main
            className={styles.container}
            onDragEnd={hideOut}
            onDragLeave={hideOut}
            onDragOver = {show}
            onMouseEnter = {show}
            onMouseLeave = {hide}
            onMouseMove={show}
        >
            { children }
        </main>
    )
}
