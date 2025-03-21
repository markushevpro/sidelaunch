import { FolderIcon } from 'src/@/segments/units/FolderIcon'

import type { FolderItem } from 'src/@/shared/types/items'

import { useFolderListItem } from './hook'

interface PFolderListItem
{
    data: FolderItem
}

export
function FolderListItem
({ data }: PFolderListItem )
{
    const { click } = useFolderListItem( data )

    return (
        <FolderIcon data={data} onClick={click} />
    )
}
