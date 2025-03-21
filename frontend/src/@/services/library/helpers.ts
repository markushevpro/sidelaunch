import { isFolder, sortHandler }                 from 'src/@/shared/utils/items'
import { ExtractIcon, ExtractLink, ReadUrlFile } from 'wailsjs/go/main/App'

import type { PathInfo }                               from './types'
import type { AppItem, FolderItem, Library, ListItem } from 'src/@/shared/types/items'

export
function addParents
<T extends ListItem>
( item: T, parent?: string ): T
{
    if ( isFolder( item )) {
        item.children = item.children.map(( kid: ListItem ) => addParents( kid, item.id ))
    }

    item.parent = parent

    return item
}

export
function mapParents
( library: Library ): Library
{
    return library.map(( kid: ListItem ) => addParents( kid, 'top' ))
}

export
function removeParent
( item: ListItem ): ListItem
{
    if ( isFolder( item )) {
        item.children = removeParents( item.children )
    }

    delete item.parent
    return item
}

export
function removeParents
( list: ListItem[]): ListItem[]
{
    return list.map( kid => removeParent( kid ))
}

export
function findInFolder
( item: ListItem, id: string ): ListItem | undefined
{
    if ( !isFolder( item )) {
        return undefined
    }

    return findInLibrary( item.children, id )
}

export
function findInLibrary
( library: ListItem[], id: string ): ListItem | undefined
{
    const top = library.find( item => item.id === id )

    if ( top ) {
        return top
    }

    // @ts-expect-error undefined
    return library.reduce(( found, item ) => found ?? findInFolder( item, id ), undefined )
}

export
function parseLibrary
( raw: string ): Library | undefined
{
    try {
        const data = JSON.parse( raw )

        if ( data && !data.error ) {
            return mapParents( data )
        } else {
            return [{
                id: crypto.randomUUID(),
                weight: 0,
                name: "Folder",
                children: []
            } as FolderItem]
        }
    } catch ( e ) {
        console.error( e )
    }
}

export
function getDeepPath
( library: Library, search: ListItem ): string[]
{
    const res: string[] = []

    let current: ListItem | undefined = search

    while ( current?.parent && current.parent !== 'top' ) {
        res.push( current.parent )
        current = findInLibrary( library, current.parent )
    }

    return res
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

export
function updateLibraryItem
( library: Library, item: AppItem | FolderItem, payload: Partial<typeof item> ): Library
{
    const target = findInLibrary( library, item.id )

    if ( target ) {
        if ( !item.parent || item.parent === 'top' ) {
            const index = library.findIndex( i => i.id === item.id )

            if ( index > -1 ) {
                library[ index ] = {
                    ...target,
                    ...payload
                }
            }
        } else {
            const parent = findInLibrary( library, item.parent ) as FolderItem

            if ( parent ) {
                const index = parent.children.findIndex( i => i.id === item.id )

                if ( index > -1 ) {
                    parent.children[ index ] = {
                        ...target,
                        ...payload
                    }
                }
            }
        }
    }

    return library
}

export
function removeFromLibrary
( library: Library, item: ListItem ): Library
{
    if ( item.parent && item.parent !== 'top' ) {
        const parent = findInLibrary( library, item.parent ) as FolderItem
        parent.children.splice( parent.children.findIndex( i => i.id === item.id ), 1 )
    } else {
        library.splice( library.findIndex( i => i.id === item.id ), 1 )
    }

    return library
}

export
function addToLibrary
( library: Library, item: ListItem, target: string ): Library
{
    if ( target === 'top' ) {
        library.push( item )
    } else {
        const parent = findInLibrary( library, target ) as FolderItem
        parent.children.push( item )
    }

    return library
}

function getMaxWeight
( items: ListItem[]): number
{
    return items.reduce(( max, item ) => Math.max( max, item.weight ?? 0 ), -Infinity )
}

function appendToFolder
( library: Library, parent: string, item: Partial<AppItem> | Partial<FolderItem> ): { created: ListItem | undefined, updated: Library }
{
    const target = findInLibrary( library, parent )

    if ( parent === 'top' || ( target && isFolder( target ))) {
        const list      = parent === 'top' ? library : ( target as FolderItem ).children
        const maxWeight = getMaxWeight( list )

        const created: ListItem = {
            ...item,
            id:     item.id ?? crypto.randomUUID(),
            weight: maxWeight + 1,
            parent
        }

        list.push({ ...created })

        return {
            updated: library,
            created
        }
    }

    return {
        updated: library,
        created: undefined
    }
}

export
function createFolder
( library: Library, parent: FolderItem ): { folder: FolderItem | undefined, updated: Library }
{
    const item: Partial<FolderItem> = {
        name:     'New Folder',
        children: []
    }

    const { created, updated } = appendToFolder( library, parent.id, item )

    return {
        folder: created as FolderItem,
        updated
    }
}

function getPathInfo
( rawPath: string ): PathInfo
{
    const path     = rawPath.replace( /(\r|\n)/g, '' )
    const split    = path.replace( /\\/g, '/' ).split( '/' )
    const filename = split.pop() ?? ''
    const fsplit   = filename?.split( '.' )
    const ext      = fsplit.pop() ?? ''
    const name     = fsplit[ 0 ]
    const dir      = split.join( '/' )

    return {
        path,
        filename,
        name,
        ext,
        dir
    }
}

async function parseLnk
( info: PathInfo ): Promise<Partial<AppItem>>
{
    const realPath = await ExtractLink( info.path )

    if ( !realPath ) {
        return {
            ...info,
            params: ''
        }
    }

    const realInfo = getPathInfo( realPath )

    return {
        ...realInfo,
        params: ''
    }
}

async function parseUrl
( info: PathInfo ): Promise<Partial<AppItem>>
{
    const data = await ReadUrlFile( info.path )
    const id   = crypto.randomUUID()

    await ExtractIcon( id, data.icon )

    return {
        ...info,
        id,
        path: data.url,
        dir:  data.dir
    }
}

async function generateItem
( path: string ): Promise<Partial<AppItem>>
{
    const info = getPathInfo( path )

    if ( info.ext === 'lnk' ) {
        return await parseLnk( info )
    }

    if ( info.ext === 'url' ) {
        return await parseUrl( info )
    }

    return {
        ...info,
        params: '' // extract params
    }
}

export
async function createAppItem
( Library: Library, parent: string, path: string ): Promise<{ item: AppItem | undefined, updated: Library }>
{
    const { created, updated } = appendToFolder( Library, parent, await generateItem( path ))

    return {
        item: created as AppItem,
        updated
    }
}
