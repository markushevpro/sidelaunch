import { useFolder } from 'src/@/services/folder/hook'

import type { IItem } from 'src/@/shared/types/items'

import { FolderItem } from './FolderItem'
import styles         from './current-folder-items.module.css'

export
function CurrentFolderItems
()
{
    const { items } = useFolder()

    return (
        <>
            {
                items.map(( item: IItem ) => (
                    <FolderItem key={item.id} className={styles.item} item={item} />
                ))
            }
        </>
    )
}
