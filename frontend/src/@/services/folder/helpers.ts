import { isFolder } from 'src/@/shared/utils/fs'

import type { FolderItem, ListItem } from 'src/@/shared/types/items'

export
function asFolder
( lib: ListItem[], id: string, weight?: number ): FolderItem
{
    return {
        id,
        weight:   weight ?? 0,
        name:     '',
        children: lib
    }
}

export
function sortHandler
( a: ListItem, b: ListItem ): number
{
    if ( isFolder( a ) && !isFolder( b )) {
        return -1
    }

    if ( isFolder( b ) && !isFolder( a )) {
        return 1
    }

    return a.weight - b.weight
}

export
function resortItems
( items: ListItem[], from: ListItem, to: ListItem ): ListItem[]
{
    const copy      = [ ...items ].sort( sortHandler )
    const fromIndex = copy.findIndex(( item: ListItem ) => item.id === from.id )
    const toIndex   = copy.findIndex(( item: ListItem ) => item.id === to.id )

    copy.splice( fromIndex, 1 )
    copy.splice( toIndex, 0, from )

    copy.forEach(( item: ListItem, index: number ) => { item.weight = index })

    return copy
}
