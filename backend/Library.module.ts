import path from 'path'

import { TFolder, TItem } from 'models'

import { isFolder } from '../tools'

import FS   from './FS.module'
import Read from './Read.module'

class Library {
    filePath = 'data/data.json'

    read = (): TItem[] => Read.json( path.resolve( FS.appPath(), this.filePath ))

    load = this.read

    save = ( data: string ) => FS.write( path.resolve( FS.appPath(), this.filePath ), data )

    exist = ( id: string ) => this.ids().includes( id )

    ids = ( top: TItem[] = []) => {
        const
            items = top || this.read()

        let
            res: string[] = []

        items.forEach(( item: TItem ) => {
            res.push( item.id )

            if ( isFolder( item )) {
                res = [ ...res, ...this.ids(( item as TFolder ).children ) ]
            }
        })

        return res
    }
}

export default new Library()
