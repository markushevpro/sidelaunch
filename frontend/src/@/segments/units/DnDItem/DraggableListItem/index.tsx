import cn            from 'classnames'
import { Draggable } from 'src/@/segments/units/Draggable'

import type { PropsWithChildren } from 'react'
import type { ListItem }          from 'src/@/shared/types/items'

import styles                   from './draggable-list-item.module.css'
import { useDraggableListItem } from './hook'

interface PDraggableListItem
extends
PropsWithChildren
{
    data: ListItem
}

export
function DraggableListItem
({ data, children }: PDraggableListItem )
{
    const { dragging, onStart, onEnd } = useDraggableListItem( data )

    return (
        <Draggable
            className={cn( dragging && styles.dragged )}
            data={data}
            onDragEnd={onEnd}
            onDragStart={onStart}
        >
            { children }
        </Draggable>
    )
}
