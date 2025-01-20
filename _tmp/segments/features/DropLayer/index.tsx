import cn                 from 'classnames'
import { useMemo }        from 'react'
import { useDropLayer }   from 'src/@/services/dnd/useDropLayer'
import { useFolderStore } from 'src/@/services/folder/store'

import type { PropsWithChildren } from 'react'

import styles from './drag-layer.module.css'

export
function DropLayer
({ children }: PropsWithChildren )
{
    const { append }     = useFolderStore()
    const { ref, state } = useDropLayer( append )

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
