/* eslint-disable no-prototype-builtins */
import { TFolder, TItem } from 'models'

export const IorF = ( item: TItem | TFolder, onItem: ( item: TItem ) => void, onFolder: ( item: TFolder ) => void ) => {
    if ( item.hasOwnProperty( 'category' )) {
        onItem( item as TItem )
    } else {
        onFolder( item as TFolder )
    }
}

export const isItem = ( item: TItem | TFolder ) => {
    return item.hasOwnProperty( 'category' )
}
