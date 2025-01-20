import cn                from 'classnames'
import { DraggableItem } from 'src/@/segments/units/DraggableItem'
import { DroppableItem } from 'src/@/segments/units/DroppableItem'
import { FileItem }      from 'src/@/segments/units/FileItem'
import { useFolder }     from 'src/@/services/folder/hook'
import { isFolder }      from 'src/@/shared/utils/fs'

import type { IItem } from 'src/@/shared/types/items'

import styles from './folder-item.module.css'

interface PFolderItem
{
    item: IItem
    className?: string
}

export
function FolderItem
({ item, className }: PFolderItem )
{
    const { hovered, dragged, dropItem, moveItem } = useFolder()

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
