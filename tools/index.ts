/* eslint-disable no-prototype-builtins */
import { TFolder, TItem, TLink } from 'models'

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
