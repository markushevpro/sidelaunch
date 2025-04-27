import { ItemView }   from 'src/@/segments/units/ItemView'
import { ListButton } from 'src/@/segments/units/ListButton'
import { Visible }    from 'src/@/shared/ui-kit/Visible'

import type { FolderItem } from 'src/@/shared/types/items'

import styles             from './folder-items.module.css'
import { useFolderItems } from './hook'

interface PFolderItems
{
    max?: number
    folder: FolderItem
}

export
function FolderItems
({ folder, max }: PFolderItems )
{
    const { visible, more } = useFolderItems( folder, max )

    return (
        <div className={styles.list}>
            {
                visible.map( item => (
                    <ItemView key={item.id} data={item} />
                ))
            }

            <Visible If={more > 0}>
                <ListButton>
                    +
                    {more}
                </ListButton>
            </Visible>
        </div>
    )
}
