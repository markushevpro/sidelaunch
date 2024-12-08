import cn                                                  from 'classnames'
import { useMemo, type PropsWithChildren, type ReactNode } from 'react'
import { useAppStore }                                     from 'src/app/services/store/store'

import styles           from './drag-layer.module.css'
import { useDragLayer } from './hook'

export
function DragLayer
({ children }: PropsWithChildren ): ReactNode
{
    const { append }     = useAppStore()
    const { ref, state } = useDragLayer( append )

    const dropClassName = useMemo(
        () => {
            if ( !state.isOver ) {
                return null
            }

            return state.canDrop
                ? styles.canDrop
                : styles.cantDrop
        },
        [ state.canDrop, state.isOver ]
    )

    return (
        <div
            ref={ref}
            className={cn(
                styles.dragLayer,
                dropClassName
            )}
        >
            { children }
        </div>
    )
}
