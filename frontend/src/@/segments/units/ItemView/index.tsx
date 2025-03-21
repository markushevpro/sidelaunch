import { isFolder } from 'src/@/shared/utils/items'

import type { AppItem, ListItem } from 'src/@/shared/types/items'

import { AppListItem }    from './AppListItem'
import { FolderListItem } from './FolderListItem'

interface PItemView
{
    data: ListItem
}

export
function ItemView
({ data }: PItemView )
{
    if ( isFolder( data )) {
        return <FolderListItem data={data} />
    }

    return (
        <AppListItem data={data as AppItem} />
    )
}
