import { isFolder } from 'src/app/shared/utils/fs'

import type { ILibrary, IFolder, IItem, ILink } from 'src/app/shared/types/items'

import { wails } from './wails'

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
function prepareForSave
( item: IItem ): IItem
{
    if ( isFolder( item )) {
        return prepareFolderForSave( item as IFolder )
    } else {
        return prepareLinkForSave( item as ILink )
    }
}

function prepareFolderForSave
( item: IFolder ): IFolder
{
    return {
        id:       item.id,
        weight:   item.weight ?? 0,
        name:     item.name,
        children: item.children.map( prepareForSave )
    }
}

function prepareLinkForSave
( item: ILink ): ILink
{
    return {
        id:     item.id,
        weight: item.weight ?? 0,
        path:   item.path,
        params: item.params,
        name:   item.name,
        dir:    item.dir
    }
}

export
async function prepareForView
( item: IItem ): Promise<IItem>
{
    return await addIcons( addParents( item ))
}

export
// TMP

async function addIcons
( item: IItem ): Promise<IItem>
{
    if ( isFolder( item )) {
        ( item as IFolder ).children.forEach(( kid: IItem ) => void addIcons( kid ))
    }

    item.icon = `data:image/png;base64,${await wails.icons.get( item.id )}`

    return item
}

export
function addParents
( item: IItem, parent?: IFolder ): IItem
{
    if ( isFolder( item )) {
        const folder    = item as IFolder
        folder.children = folder.children.map(( kid: IItem ) => addParents( kid, folder ))
    }

    item.parent = parent?.id

    return item
}
