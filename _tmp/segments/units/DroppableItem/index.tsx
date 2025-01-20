import { useDroppable } from 'src/@/services/dnd/useDroppable'

import type { PropsWithChildren } from 'react'
import type { IItem }             from 'src/@/shared/types/items'
import type { Customizable }      from 'src/@/shared/types/props'

export
interface PDroppableItem
extends
PropsWithChildren,
Customizable
{
    data: IItem
    hidden?: boolean,
    onMove: ( currentItem: IItem, hoverItem: IItem ) => void,
    onDrop: ( currentItem: IItem, targetItem: IItem ) => void
}

export
function DroppableItem
({ hidden, data, children, className, onMove, onDrop }: PDroppableItem )
{
    const { ref, id } = useDroppable( data, onDrop, onMove )

    if ( hidden ) { return null }

    return (
        <div
            ref={ref}
            className={className}
            data-handler-id={id}
        >
            { children }
        </div>
    )
}
