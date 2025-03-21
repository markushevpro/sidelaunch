import type { PropsWithChildren } from 'react'
import type { ListItem }          from 'src/@/shared/types/items'

import { DraggableListItem } from './DraggableListItem'
import { DroppableListItem } from './DroppableListItem'

interface PDnDItem
extends
PropsWithChildren
{
    data: ListItem
}

export
function DnDItem
({ data, children }: PDnDItem )
{
    return (
        <DroppableListItem data={data}>
            <DraggableListItem data={data}>
                { children }
            </DraggableListItem>
        </DroppableListItem>
    )
}
