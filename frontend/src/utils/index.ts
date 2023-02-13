/* eslint-disable no-prototype-builtins */
import { TFolder, TItem } from 'models'

interface WithChildren {
    children: React.ReactNode
}

interface WithRef {
    ref: React.RefObject<any>
}

export type { WithChildren, WithRef }

export const IorF = ( item: TItem | TFolder, onItem: ( item: TItem ) => void, onFolder: ( item: TFolder ) => void ) => {
    if ( isItem( item )) {
        onItem( item as TItem )
    } else {
        onFolder( item as TFolder )
    }
}

export const isItem = ( item: TItem | TFolder ) => {
    return item.hasOwnProperty( 'category' )
}
