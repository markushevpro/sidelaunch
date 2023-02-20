import { TFolder, TItem, TLibrary, TLink } from 'models'
import { isFolder }                        from 'utils'

const topFolder = ( lib: TLibrary ): TFolder => ({
    id:       'top',
    name:     '',
    children: lib
})

const presave = ( item: TItem ): TItem => {
    if ( isFolder( item )) {
        return presaveFolder( item as TFolder )
    } else {
        return presaveLink( item as TLink )
    }
}

const presaveFolder = ( item: TFolder ): TFolder => {
    return {
        id:       item.id,
        name:     item.name,
        children: item.children.map( presave )
    }
}

const presaveLink = ( item: TLink ): TLink => {
    return {
        id:     item.id,
        path:   item.path,
        params: item.params,
        name:   item.name,
        dir:    item.dir
    }
}

const iconize = async ( item: TItem ) => {
    if ( isFolder( item )) {
        iconizeFolder( item as TFolder )
    }

    item.icon = `data:image/png;base64,${await window.backend.icons.load( item.id )}`

    return item
}

const iconizeFolder = async ( item: TFolder ) => {
    item.children.forEach( async ( kid: TItem ) => await iconize( kid ))
}

const parentize = ( item: TItem, parent?: TFolder ) => {
    if ( isFolder( item )) {
        parentizeFolder( item as TFolder )
    }

    item.parent = parent?.id

    return item
}

const parentizeFolder = ( item: TFolder ) => {
    item.children = item.children.map(( kid: TItem ) => parentize( kid, item ))
}

const find = ( id: string | undefined, item: TFolder ): TItem | undefined => {
    if ( id === item.id ) { return item }

    return item.children.find(( candidate: TItem ) => {
        if ( candidate.id === id ) {
            return true
        }

        if ( isFolder( candidate )) {
            return find( id, candidate as TFolder )
        }

        return false
    })
}

export default {
    iconize,
    parentize,
    topFolder,
    find,
    presave
}
