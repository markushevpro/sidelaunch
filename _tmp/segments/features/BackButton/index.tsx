import cn                from 'classnames'
import { DroppableItem } from 'src/@/segments/units/DroppableItem'
import { useFolder }     from 'src/@/services/folder/hook'

import type { IItem } from 'src/@/shared/types/items'

import { BackArrow } from './BackArrow'
import styles        from './back-button.module.css'

export
function BackButton
()
{
    const { folder, hovered, moveItem, dropItem } = useFolder()

    return (
        <DroppableItem
            className={cn( 'list-item', styles.button, hovered === 'back' && styles.hovered )}
            data={{ id: 'back' } as IItem }
            hidden={!folder?.parent}
            onDrop={dropItem}
            onMove={moveItem}
        >
            <BackArrow target={folder?.parent} />
        </DroppableItem>
    )
}
