import { isFolder } from 'src/app/shared/utils/fs'

import type { IItem } from 'src/app/shared/types/items'

export
function sortHandler
( a: IItem, b: IItem ): number
{
    if ( isFolder( a ) && !isFolder( b )) {
        return -1
    }

    if ( isFolder( b ) && !isFolder( a )) {
        return 1
    }

    return a.weight - b.weight
}
