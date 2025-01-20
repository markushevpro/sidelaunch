import { IconItem } from 'src/@/segments/units/IconItem'

import type { ListItem } from 'src/@/shared/types/items'

interface PSmartItem
{
    data: ListItem
}

export
function SmartItem
({ data }: PSmartItem )
{
    // determine folder or app
    // return FolderButton / AppButton

    return (
        <IconItem>
            { data.id }
        </IconItem>
    )
}
