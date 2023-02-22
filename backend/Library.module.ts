import path from 'path'

import { TFolder, TItem } from 'models'

import { isFolder } from '../tools'

import Files  from './Files.module'
import System from './System.module'

class Library {

    filePath = 'data/data.json'

    raw = () => Files.read.string( path.resolve( System.appPath(), this.filePath ))

    load = (): TItem[] => Files.read.json( path.resolve( System.appPath(), this.filePath ))

    save = ( data: string ) => Files.write( path.resolve( System.appPath(), this.filePath ), data )

    exist = ( id: string ) => this.ids().includes( id )

    ids = ( top: TItem[] = []) => {
        const
            items = top || this.load()

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
