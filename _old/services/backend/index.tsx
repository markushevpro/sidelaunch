import { isFolder } from 'src/app/shared/utils/fs'

import type { IConfig, IFolder, IItem, ILibrary } from 'src/app/shared/types/items'

import { emptyFolder }                                 from './const'
import { prepareForView, asTopFolder, prepareForSave } from './helpers'
import { wails }                                       from './wails'

class Backend {
    /*
    /* --- Current folder -------------------------------------------------- */

    private _current: IFolder = emptyFolder

    get current
    (): IFolder
    {
        return this._current
    }

    set current
    ( value: IFolder )
    {
        this._current = value
    }

    /* --- Config data ---------------------------------------------------- */

    private _config: IConfig = {}

    get config
    (): IConfig
    {
        return this._config
    }

    set config
    ( value: IConfig )
    {
        this._config = value
    }

    /* --- Items library ---------------------------------------------------- */

    private _library: IFolder = emptyFolder

    get library
    (): IFolder
    {
        return this._library
    }

    set library
    ( value: IFolder )
    {
        this._library = value
    }

    /* --- Store state ----- */

    private _loaded = false

    get loaded
    (): boolean
    {
        return this._loaded
    }

    set loaded
    ( value: boolean )
    {
        this._loaded = value
    }

    /* --- Functions --------------------------------------------------------- */

    constructor () {
        void this.load()
    }

    async load
    ( keepFolder = false ): Promise<void>
    {
        const current = this.current?.id ?? 'top'

        const config: IConfig  = await wails.config.load()
        const rawLib: ILibrary = await wails.library.load()
        const library: IFolder = await prepareForView( asTopFolder( rawLib )) as IFolder

        this.config  = config
        this.library = library
        this.loaded  = true

        this.set( keepFolder ? current : 'top' )
    }

    async update
    ( id: string, payload: Partial<IItem> ): Promise<void>
    {
        const lib: IFolder = { ...this.library }
        const keys         = Object.keys( payload )

        const target: IItem | undefined = this.find( id, lib )

        if ( target ) {
            keys.forEach(( key: string ) => {
                // @ts-expect-error key
                target[ key ] = payload[ key ]
            })

            await this.save( lib )
        }
    }

    async batchUpdate
    ( items: IItem[]): Promise<void>
    {
        const lib = { ...this.library }

        let target: unknown
        let keys: string[]

        for ( const item of items ) {
            target = this.find( item.id, lib )
            keys   = Object.keys( item )

            keys.forEach(( key: string ) => {
                if ( key !== 'id' ) {
                    // @ts-expect-error key
                    target[ key ] = item[ key ]
                }
            })
        }

        await this.save( lib )
    }

    async move
    ( targetId: string, data: IItem ): Promise<IItem | undefined>
    {
        const lib    = { ...this.library }
        const parent = this.find<IFolder>( data.parent, lib )
        const target = this.find<IFolder>( targetId, lib )
        const insert = { ...data }

        if ( parent && target ) {
            if ( target.id === parent.id || target.id === data.id ) {
                return
            }

            insert.parent   = targetId
            target.children = [ ...target.children, insert ]
            parent.children.splice( parent.children.findIndex(( item: IItem ) => item.id === data.id ), 1 )

            await this.save( lib )
            return target
        }
    }

    async insert
    ( parentId: string, data: IItem ): Promise<IItem>
    {
        const lib     = { ...this.library }
        const parent  = this.find<IFolder>( parentId, lib )
        const newItem = await prepareForView( data )

        newItem.parent = parentId
        ;( parent ) && ( parent.children = [ ...parent.children, newItem ])

        await this.save( lib )
        return newItem
    }

    async batchInsert
    ( parentId: string, items: IItem[]): Promise<IItem | undefined>
    {
        const lib    = { ...this.library }
        const parent = this.find<IFolder>( parentId, lib )

        let newItem

        for ( const item of items ) {
            newItem        = await prepareForView( item )
            newItem.parent = parentId
            ;( parent ) && ( parent.children = [ ...parent.children, newItem ])
        }

        await this.save( lib )
        return newItem
    }

    async remove
    ( id: string ): Promise<void>
    {
        const lib    = { ...this.library }
        const target = this.find( id, lib )
        const parent = this.find<IFolder>( target?.parent, lib )

        if ( !parent ) { return }

        parent.children.splice( parent.children.findIndex(( item: IItem ) => item.id === id ), 1 )

        await this.save( lib )
    }

    async save
    ( top: IFolder ): Promise<void>
    {
        const current = this.current.id

        const prep: IFolder = prepareForSave( top ) as IFolder

        await wails.library.save( JSON.stringify( prep.children ))

        this.library = await prepareForView( asTopFolder( await wails.library.load())) as IFolder
        this.set( current )
    }

    set
    ( folderId: string ): void
    {
        const found = this.find<IFolder>( folderId, this.library )

        this.current = emptyFolder
        setTimeout(() => { this.current = found ?? this.library }, 0 )
    }

    get
    ( id: string | undefined ): IItem
    {
        if ( !id ) { return this.library }
        return this.find( id, this.library ) ?? this.library
    }

    find
    <T extends IItem>
    ( id: string | undefined, item: IItem ): T | undefined
    {
        if ( id === item.id ) {
            return item as T
        } else if ( isFolder( item )) {
            const folder = item as IFolder

            let result: IItem | undefined = void 0

            for ( let i = 0; result === undefined && i < folder.children.length; i++ ) {
                result = this.find( id, folder.children[ i ])
            }

            return result as T
        }

        return undefined
    }

    refresh
    (): void
    {
        this.current.children = [ ...this.current.children ]
    }
}

export
const backend = new Backend()
