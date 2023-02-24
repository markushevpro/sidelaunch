/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeAutoObservable } from 'mobx'

import { TFolder, TConfig, TItem } from 'models'

import modules from './modules'
import utils   from './modules/utils'

const emptyFolder = {
    id:       'none',
    weight:   0,
    name:     '',
    children: []
}

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
        this.init()

        makeAutoObservable( this, {}, {
            autoBind: true,
            deep:     true
        })
    }

    init = () => {
        const { config, library } = modules.load()

        this.config = config
        this.library = library
        this.current = library
    }

    get = ( id: string | undefined ): TItem => {
        if ( !id ) { return this.library }
        return utils.find( id, this.library ) ?? this.library
    }

    refresh = () => this.current.children = [ ...this.current.children ]
}

export default new Store()
