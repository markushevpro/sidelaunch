/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeAutoObservable } from 'mobx'

import { TFolder, TConfig, TItem, TLibrary } from 'models'
import { isFolder }                          from 'tools'

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

    /* --- Functions --------------------------------------------------------- */

    constructor () {
        this.load()

        makeAutoObservable( this, {}, {
            autoBind: true,
            deep:     true
        })
    }

    load = async () => {
        const
            config: TConfig = await window.backend.config.load(),
            rawLib: TLibrary = await window.backend.library.load(),
            library: TFolder = await prepareForView( useAsTopFolder( rawLib )) as TFolder

        this.config = config
        this.library = library
        this.current = library
    }

    save = () => {
        window.backend.library.save( JSON.stringify(( prepareForSave( this.library ) as TFolder ).children ))

        if ( this.current.id === 'top' ) {
            this.current = this.library
        }
    }

    set = ( folder: TFolder ) => this.current = folder

    get = ( id: string | undefined ): TItem => {
        if ( !id ) { return this.library }
        return this.find( id, this.library ) ?? this.library
    }

    folder = (): TFolder => this.find( this.current?.id, this.library ) as TFolder

    find = ( id: string | undefined, item: TFolder ): TItem | undefined => {
        if ( id === item.id ) { return item }

        return item.children.find(( candidate: TItem ) => {
            if ( candidate.id === id ) {
                return true
            }

            if ( isFolder( candidate )) {
                return this.find( id, candidate as TFolder )
            }

            return false
        })
    }

    refresh = () => this.current.children = [ ...this.current.children ]
}

export default new Store()
