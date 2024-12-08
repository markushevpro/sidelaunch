import cn                from 'classnames'
import { DraggableItem } from 'src/app/segments/elements/DraggableItem'
import { DroppableItem } from 'src/app/segments/elements/DroppableItem'
import { FileItem }      from 'src/app/segments/elements/FileItem'
import { useList }       from 'src/app/services/list/hook'
import { isFolder }      from 'src/app/shared/utils/fs'

import type { ReactNode } from 'react'
import type { IItem }     from 'src/app/shared/types/items'

import styles from './list-item.module.css'

interface PListItem
{
    item: IItem
    className?: string
}

export
function ListItem
({ item, className }: PListItem ): ReactNode
{
    const { hovered, dragged, dropItem, moveItem } = useList()

    return (
        <DroppableItem
            className={cn( className, isFolder( item ) && styles.folder, hovered === item.id && styles.hovered, dragged === item.id && styles.dragged )}
            data={item}
            onDrop={dropItem}
            onMove={moveItem}
        >
            <DraggableItem data={item}>
                <FileItem data={item} />
            </DraggableItem>
        </DroppableItem>
    )
}
