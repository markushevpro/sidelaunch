import { useEffect, useState } from 'react'

import { TConfigValue, TFolder, TItem, TLink } from 'models'

import store from './store'
import utils from './utils'

class Service {

    constructor () {
        store.load.config().then( store.load.library )
    }

    config = {
        get: ( key: string ) => store.config[ key ],
        set: ( key: string, value: TConfigValue ) => {
            store.config[ key ] = value
            store.save.config()
        }
    }

    current = {
        get: () => store.folder,
        set: ( data: TFolder ) => {
            store.folder = data
        }
    }

    items = {
        icon:   store.update.icon,
        rename: store.update.name,

        add: ( files: File[]) => {
            if ( files.length > 1 ) {
                store.insert.multiple( files )
            } else {
                store.insert.file( files[ 0 ])
            }
        },

        create: ( name: string ) => {
            store.insert.folder( name ).then(() => {
                store.save.library()
            })
        },

        run: ( link: TLink ) => {
            link.params
                ? window.backend.fs.run({
                    path: link.path,
                    args: link.params,
                    dir:  link.dir
                })
                : window.backend.fs.run( link.path )
        }
    }

    get = ( id: string | undefined ): TItem => {
        if ( !id ) { return store.library }
        return utils.find( id, store.library ) ?? store.library
    }
}

const
    service = new Service()

export const useConfig = ( key: string ) => {
    const
        [ result, $result ] = useState<TConfigValue>( '' )

    useEffect(() => {
        const
            getConfig = async () => {
                $result( service.config.get( key ))
            }

        getConfig()
    }, [ key ])

    return result
}

export { store }

export default service
