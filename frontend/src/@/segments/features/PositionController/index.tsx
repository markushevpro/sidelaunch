import cn from 'classnames'

import type { PropsWithChildren } from 'react'

import { usePositionController } from './hook'
import styles                    from './position-controller.module.css'

type PPositionController = PropsWithChildren

export
function PositionController
({ children }: PPositionController )
{
    const { drop, show, hide, dropShow, dropHide } = usePositionController()

    return (
        <main
            className={cn( styles.container, drop && styles.drop )}
            onDragEnd={dropHide}
            onDragLeave={dropHide}
            onDragOver={dropShow}
            onMouseEnter={show}
            onMouseLeave={hide}
            onMouseMove={show}
        >
            { children }
        </main>
    )
}
