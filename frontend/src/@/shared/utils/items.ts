import type { ListItem, FolderItem } from 'src/@/shared/types/items'

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

    return ( a.weight ?? 0 ) - ( b.weight ?? 0 )
}

export
function isFolder
( item: ListItem ): item is FolderItem
{
    // eslint-disable-next-line no-prototype-builtins
    return item.hasOwnProperty( 'children' )
}
