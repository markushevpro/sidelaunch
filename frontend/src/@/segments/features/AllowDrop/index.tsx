import { useDroppable } from 'src/@/services/dnd/useDroppable'

import type { PropsWithChildren } from 'react'
import type { ListItem }          from 'src/@/shared/types/items'

export
interface PAllowDrop
extends
PropsWithChildren
{
    data: ListItem
    onDrop: ( currentItem: ListItem, targetItem: ListItem ) => void
    onHover?: ( currentItem: ListItem, hoverItem: ListItem ) => void,
}

export
function AllowDrop
({ data, children, onHover, onDrop }: PAllowDrop )
{
    const { ref, id } = useDroppable( data, onDrop, onHover )

    return (
        <div ref={ref} data-handler-id={id}>
            { children }
        </div>
    )
}
