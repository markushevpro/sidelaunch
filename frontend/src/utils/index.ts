/* eslint-disable no-prototype-builtins */
import { TFolder, TItem, TLink } from 'models'
import store                     from 'store'

export * from './types'

export const IorF = ( item: TItem, onLink: ( link: TLink ) => void, onFolder: ( item: TFolder ) => void ) => {
    if ( !isFolder( item )) {
        onLink( item as TLink )
    } else {
        onFolder( item as TFolder )
    }
}

export const isFolder = ( item: TItem ) => {
    return item.hasOwnProperty( 'children' )
}

export const run = ( data: TItem ) => {
    IorF(
        data,
        () => runFile( data as TLink ),
        () => store.set( data.id )
    )
}

const runFile = ( link: TLink ) => {
    link.params
        ? window.backend.fs.run({
            path: link.path,
            args: link.params,
            dir:  link.dir
        })
        : window.backend.fs.run( link.path )
}
