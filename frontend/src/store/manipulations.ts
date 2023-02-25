import { TFolder, TItem, TLibrary, TLink } from 'models'
import { isFolder }                        from 'utils'

export const useAsTopFolder = ( lib: TLibrary ): TFolder => ({
    id:       'top',
    weight:   0,
    name:     '',
    children: lib
})

export const prepareForSave = ( item: TItem ): TItem => {
    if ( isFolder( item )) {
        return prepareFolderForSave( item as TFolder )
    } else {
        return prepareLinkForSave( item as TLink )
    }
}

const prepareFolderForSave = ( item: TFolder ): TFolder => {
    return {
        id:       item.id,
        weight:   item.weight ?? 0,
        name:     item.name,
        children: item.children.map( prepareForSave )
    }
}

const prepareLinkForSave = ( item: TLink ): TLink => {
    return {
        id:     item.id,
        weight: item.weight ?? 0,
        path:   item.path,
        params: item.params,
        name:   item.name,
        dir:    item.dir
    }
}

export const prepareForView = ( item: TItem ) => addIcons( addParents( item ))

export const addIcons = async ( item: TItem ) => {
    if ( isFolder( item )) {
        ( item as TFolder ).children.forEach( async ( kid: TItem ) => await addIcons( kid ))
    }

    item.icon = `data:image/png;base64,${await window.backend.icons.get( item.id )}`

    return item
}

export const addParents = ( item: TItem, parent?: TFolder ) => {
    if ( isFolder( item )) {
        const folder = item as TFolder
        folder.children = folder.children.map(( kid: TItem ) => addParents( kid, folder ))
    }

    item.parent = parent?.id

    return item
}
