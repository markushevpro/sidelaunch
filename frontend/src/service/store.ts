/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeAutoObservable } from 'mobx'

import { TFolder, TItem } from 'models'

class Store {
    private _folder?: TFolder | undefined

    get folder () {
        return this._folder
    }

    set folder ( value: TFolder | undefined ) {
        this._folder = value
    }

    private _folders: TFolder[] = []

    get folders () {
        return this._folders
    }

    set folders ( value: TFolder[]) {
        this._folders = value
    }

    private _items: TItem[] = []

    get items () {
        return this._items
    }

    set items ( value: TItem[]) {
        this._items = value
    }

    constructor () {
        makeAutoObservable( this, {}, {
            autoBind: true,
            deep:     true
        })
    }
}

export default new Store()
