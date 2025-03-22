import { isFolder } from 'src/@/shared/utils/items'

import type { ListItem } from 'src/@/shared/types/items'

export
function extractAllIDs
( items: ListItem[] | undefined ): string[]
{
    if ( !items ) {
        return []
    }

    let res: string[] = []

    items.forEach( item => {
        res.push( item.id )

        if ( isFolder( item )) {
            res = [ ...res, ...extractAllIDs( item.children ) ]
        }
    })

    return res
}
