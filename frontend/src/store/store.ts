/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeAutoObservable } from 'mobx'

import { TFolder, TConfig, TLibrary, TItem } from 'models'
import { isFolder, TStruct, TWithID }        from 'utils'

import { emptyFolder }                                    from './generate'
import { prepareForSave, prepareForView, useAsTopFolder } from './manipulations'

class Store {

    /* --- Current folder -------------------------------------------------- */

    private _current: TFolder = emptyFolder

    get current () {
        return this._current
    }

    set current ( value: TFolder ) {
        this._current = value
    }

    /* --- Config data ---------------------------------------------------- */

    private _config: TConfig = {}

    get config () {
        return this._config
    }

    set config ( value: TConfig ) {
        this._config = value
    }

    /* --- Items library ---------------------------------------------------- */

    private _library: TFolder = emptyFolder

    get library () {
        return this._library
    }

    set library ( value: TFolder ) {
        this._library = value
    }

    /* --- Store state ----- */

    private _loaded = false

    get loaded () {
        return this._loaded
    }

    set loaded ( value: boolean ) {
        this._loaded = value
    }

    /* --- Functions --------------------------------------------------------- */

    constructor () {
        makeAutoObservable( this, {}, {
            autoBind: true,
            deep:     true
        })

        this.load()
    }

    load = async ( keepFolder = false ) => {
        const
            cur = this.current?.id ?? 'top',
            config: TConfig = await window.backend.config.load(),
            rawLib: TLibrary = await window.backend.library.load(),
            library: TFolder = await prepareForView( useAsTopFolder( rawLib )) as TFolder

        this.config = config
        this.library = library
        this.loaded = true
        this.set( keepFolder ? cur : 'top' )
    }

    update = async ( id: string, data: TStruct ) => {
        const
            lib = { ...this.library },
            target: TStruct = this.find( id, lib ) as TStruct,
            keys = Object.keys( data )

        keys.forEach(( key: string ) => {
            target[ key ] = data[ key ]
        })

        await this.save( lib )
    }

    batchUpdate = async ( items: Array<TStruct & TWithID> ) => {
        const
            lib = { ...this.library }

        let
            target: TStruct,
            keys: string[]

        for ( let i = 0; i < items.length; i++ ) {
            target = this.find( items[ i ].id, lib ) as TStruct
            keys = Object.keys( items[ i ])

            keys.forEach(( key: string ) => {
                if ( key !== 'id' ) {
                    target[ key ] = items[ i ][ key ]
                }
            })
        }

        await this.save( lib )
    }

    move = async ( targetId: string, data: TItem ) => {
        const
            lib = { ...this.library },
            parent = this.find( data.parent, lib ) as TFolder,
            target = this.find( targetId, lib ) as TFolder,
            insertItem = { ...data }

        if ( target.id === parent.id || target.id === data.id ) {
            return
        }

        insertItem.parent = targetId
        target.children = [ ...target.children, insertItem ]
        parent.children.splice( parent.children.findIndex(( item: TItem ) => item.id === data.id ), 1 )

        await this.save( lib )
        return target
    }

    insert = async ( parentId: string, data: TItem ) => {
        const
            lib = { ...this.library },
            parent = this.find( parentId, lib ) as TFolder,
            newItem = await prepareForView( data )

        newItem.parent = parentId
        ;( parent ) && ( parent.children = [ ...parent.children, newItem ])

        await this.save( lib )
        return newItem
    }

    batchInsert = async ( parentId: string, items: TItem[]) => {
        const
            lib = { ...this.library },
            parent = this.find( parentId, lib ) as TFolder

        let
            newItem

        for ( let i = 0; i < items.length; i++ ) {
            newItem = await prepareForView( items[ i ])
            newItem.parent = parentId
            ;( parent ) && ( parent.children = [ ...parent.children, newItem ])
        }

        await this.save( lib )
        return newItem
    }

    remove = async ( id: string ) => {
        const
            lib = { ...this.library },
            target = this.find( id, lib ),
            parent = this.find( target?.parent, lib ) as TFolder

        if ( !parent ) { return }

        parent.children.splice( parent.children.findIndex(( item: TItem ) => item.id === id ), 1 )

        await this.save( lib )
    }

    save = async ( top: TFolder ) => {
        const cur = this.current.id

        await window.backend.library.save( JSON.stringify(( prepareForSave( top ) as TFolder ).children ))

        this.library = await prepareForView( useAsTopFolder( await window.backend.library.load())) as TFolder
        this.set( cur )
    }

    set = ( folderId: string ) => {
        const
            found = this.find( folderId, this.library ) as TFolder

        this.current = emptyFolder
        setTimeout(() => this.current = found ?? this.library, 0 )
    }

    get = ( id: string | undefined ): TItem => {
        if ( !id ) { return this.library }
        return this.find( id, this.library ) ?? this.library
    }

    find = ( id: string | undefined, item: TItem ): TItem | undefined => {
        if ( id === item.id ) {
            return item
        } else if ( isFolder( item )) {
            const
                folder = item as TFolder

            let
                result: TItem | undefined = void 0

            for ( let i = 0; result === void 0 && i < folder.children.length; i++ ) {
                result = this.find( id, folder.children[ i ])
            }

            return result
        }

        return void 0
    }

    refresh = () => this.current.children = [ ...this.current.children ]
}

export default new Store()
