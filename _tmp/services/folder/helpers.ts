import { isFolder } from 'src/@/shared/utils/fs'

import type { IFolder, IItem, ILibrary } from 'src/@/shared/types/items'

export
function asTopFolder
( lib: ILibrary ): IFolder
{
    return {
        id:       'top',
        weight:   0,
        name:     '',
        children: lib
    }
}

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

export
function resortItems
( items: IItem[], from: IItem, to: IItem ): IItem[]
{
    const copy      = [ ...items ].sort( sortHandler )
    const fromIndex = copy.findIndex(( item: IItem ) => item.id === from.id )
    const toIndex   = copy.findIndex(( item: IItem ) => item.id === to.id )

    copy.splice( fromIndex, 1 )
    copy.splice( toIndex, 0, from )

    copy.forEach(( item: IItem, index: number ) => { item.weight = index })

    return copy
}
