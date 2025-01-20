import cn              from 'classnames'
import { useCallback } from 'react'

export
function AddButton
({ className }: { className?: string })
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
