/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from 'react'

import { TFolder, TItem } from 'models'
import { IorF }           from 'utils'

import FolderIcon from '../assets/folder.png'

import store from './store'

class Service {
    callbacks: { (): void } [] = []

    _set = ( key: string, value: any ) => {
        ( this as any )[ `_${key}` ] = value
        this._changed()
    }

    _changed = () => {
        this.callbacks.forEach( cb => cb())
    }

    _check = async ( file: any ) => {
        if ( !file.size && !file.type ) { return false }

        /*const
            ext = await window.backend.fs.getExtention( file.path )

        if ( !allowed.includes( ext.toLowerCase())) { return false }*/

        return true
    }

    reload = () => {
        this.items.list()
        this.folders.list()
    }

    constructor () {
        window.backend.on.reload(() => this.reload())
        window.backend.on.reloadFolders(() => this.folders.list())
        window.backend.on.reloadItems(() => this.items.list())

        //window.backend.on.removeItem( preremove.item )
        //window.backend.on.removeFolder( preremove.folder )
    }

    items = {
        flush: () => store.items = [],
        set:   ( items: TItem[]) => {
            store.items = items
        },
        list: async () => {
            store.items = await window.backend.items.list( store.folder?.id ?? null )
        }
    }

    folders = {
        flush: () => store.folders = [],
        set:   ( folders: TFolder[]) => {
            store.folders = folders
        },
        list: async () => {
            store.folders = await window.backend.folders.list( store.folder?.id ?? null )
        }
    }

    current = ( folder: TFolder | undefined ) => {
        store.folder = folder
    }

    addChangeCallback = ( cb: () => void ) => {
        !this.callbacks.includes( cb ) && this.callbacks.push( cb )
    }

    config = async ( key: string ) => {
        return await window.backend.config.get( key )
    }

    run = ( path: string | null ) => {
        path && window.backend.fs.run( path )
    }

    files = {
        add: ( files: File[]) => {
            console.log( 'add [1]:', files )
            if ( files.length > 1 ) {
                this.askForMultiple( files.length ).then(( answer: string ) => {
                    switch ( answer ) {
                        case 'folder':
                            this.files.addFolder( files )
                            break
                        default:
                            this.files.separated( files )
                    }
                })
            } else {
                this.files.separated( files )
            }
        },

        addFolder: ( files: File[]) => {
            this.create( `New ${files.length} element${files.length === 1 ? 's' : ''}` ).then( newFolder => {
                this.folders.flush()
                this.items.flush()
                this.current( newFolder )
                this.files.separated( files )
            })
        },

        separated: ( files: File[]) => {
            files.forEach(( file ) => {
                this.files.addFile( store.folder, file )
            })
        },

        addFile: async ( parent: TFolder | undefined, file: any ) => {
            const
                checked = await this._check( file )

            if ( !checked ) {
                return
            }

            const
                path = await window.backend.fs.getRealPath( file.path ),
                icon = await window.backend.fs.getIcon( file.path ),
                name = file.name.split( '.' ).slice( 0, -1 ).join( '.' )

            return await window.backend.items.add({
                path,
                icon,
                category: parent?.id,
                name
            })
        }
    }

    create = async ( name: string ) => {
        return await window.backend.folders.create({
            parentId: store.folder?.id,
            name,
            icon:     FolderIcon
        })
    }

    get = async ( id: number, type: string ) => {

        if ( type ) {
            return type === 'folder'
                ? await window.backend.folders.get( id )
                : await window.backend.items.get( id )
        }
    }

    rename = async ( item: TItem | TFolder, name: string ) => {
        IorF(
            item,
            () => window.backend.items.rename( item.id, name ),
            () => window.backend.folders.rename( item.id, name )
        )
    }

    changeIcon = async ( item: TItem | TFolder, path: string ) => {
        IorF(
            item,
            () => window.backend.items.changeIcon( item.id, path ),
            () => window.backend.folders.changeIcon( item.id, path )
        )
    }

    askForMultiple = async ( length: number ) => {
        return await window.backend.ui.askForMultiple( length )
    }

    answer = async ( some: string ) => {
        return await window.backend.ui.answer( some )
    }
}

const
    service = new Service()

export const useConfig = ( key: string ) => {
    const
        [ result, $result ] = useState( '' )

    useEffect(() => {
        const
            getConfig = async () => {
                const
                    res = await service.config( key )

                $result( res )
            }

        getConfig()
    }, [ key ])

    return result
}

export { store }

export default service
