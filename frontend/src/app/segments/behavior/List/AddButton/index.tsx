import cn              from 'classnames'
import { useCallback } from 'react'

import type { ReactNode } from 'react'

export
function AddButton
({ className }: { className?: string }): ReactNode
{
    const onAdd = useCallback(
        () => {
            const handler = async (): Promise<void> => {
                // const folder = await StoreActions.addFolder( 'New folder' )
                // store.set( folder.id )
            }

            void handler()
        },
        []
    )

    return (
        <li className={cn( 'center-container', className )} onClick={onAdd}>
            +
        </li>
    )
}
