/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeAutoObservable } from 'mobx'

import { TFolder, TConfig, TItem, TLibrary, TLink } from 'models'

import utils from './utils'

const emptyFolder = {
    id:       'none',
    name:     '',
    children: []
}

class Store {

    /* --- Current folder -------------------------------------------------- */

    private _folder: TFolder = emptyFolder

    get folder () {
        return this._folder
    }

    set folder ( value: TFolder ) {
        this._folder = value
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
        makeAutoObservable( this, {}, {
            autoBind: true,
            deep:     true
        })
    }

    refresh = () => this.folder.children = [ ...this.folder.children ]

    check = {
        file: ( file: any ) => {
            if ( !file.size && !file.type ) { return false }
            return true
        }
    }

    load = {

        config: async () => {
            window.backend.config.load().then(( cfg: TConfig ) => {
                this.config = cfg
            })
        },

        library: async () => {
            window.backend.library.load().then( async ( lib: TLibrary ) => {
                const parentized: TFolder = await utils.iconize( utils.parentize( utils.topFolder( lib ))) as TFolder

                this.library = parentized
                this.folder = parentized
            })
        }
    }

    save = {
        config:  () => window.backend.config.save( JSON.stringify( this.config )),
        library: () => {
            window.backend.library.save( JSON.stringify(( utils.presave( this.library ) as TFolder ).children ))

            if ( this.folder.id === 'top' ) {
                this.folder = this.library
            }
        }
    }

    update = {
        icon: async ( item: TItem, path?: string ) => {
            if ( path ) {
                const
                    res = await window.backend.icons.update({
                        id: item.id,
                        path
                    }),
                    found = utils.find( item.id, this.library )

                if ( found ) {
                    found.icon = res
                    this.refresh()
                }

                return res
            } else {
                return await window.backend.icons.remove( item.id )
            }
        },
        name: ( item: TItem, name: string ) => {
            item.name = name
            this.save.library()
        }
    }

    remove = {
        file: ( link: TLink ) => {
            const parent: TFolder | undefined = utils.find( link.parent, this.library ) as TFolder

            if ( !parent ) { return }

            parent.children.splice( parent.children.findIndex(( item: TItem ) => item.id === link.id ), 1 )

            parent.children = [ ...parent.children ]
            this.save.library()
        },
        folder: ( folder: TFolder, keepChildren: boolean ) => {
            const parent: TFolder | undefined = utils.find( folder.parent, this.library ) as TFolder

            if ( !parent ) { return }

            if ( keepChildren ) {
                parent.children = [ ...parent.children, ...folder.children ].filter(( item: TItem, index: number, arr: TItem[]) => arr.indexOf( item ) === index )
            }

            parent.children.splice( parent.children.findIndex(( item: TItem ) => item.id === folder.id ), 1 )

            parent.children = [ ...parent.children ]
            this.save.library()
        }
    }

    generate = {
        folder: ( name: string, parent?: string ): TFolder => ({
            id:       crypto.randomUUID(),
            name,
            children: [],
            parent
        }),

        link: ({ name, path, params, dir, parent }: Omit<TLink, 'id'> ): TLink => ({
            id: crypto.randomUUID(),
            name,
            path,
            params,
            parent,
            dir
        })
    }

    insert = {
        multiple: ( files: File[]) => {
            window.backend.ui.askForMultiple( files.length ).then(( answer: string ) => {
                switch ( answer ) {
                    case 'folder':
                        this.insert.folder( files )
                        break
                    default:
                        this.insert.files( files )
                }
            })
        },

        folder: async ( nameOrFiles: File[] | string ) => {
            let name, files

            if ( typeof nameOrFiles === 'string' ) {
                name = nameOrFiles
                files = void 0
            } else {
                files = nameOrFiles
                name = `New ${files.length} element${files.length === 1 ? 's' : ''}`
            }

            const
                target = utils.find( this.folder?.id, this.library ) as TFolder,
                newFolder = await utils.iconize( utils.parentize( this.generate.folder( name ), target )) as TFolder

            target.children = [ ...target.children, newFolder ]
            this.folder = newFolder

            if ( files ) {
                this.insert.files( files )
            }
        },

        files: ( files: File[]) => {
            files.forEach(( file ) => {
                this.insert.file( file )
            })
        },

        file: async ( file: any ) => {
            const
                checked = this.check.file( file )

            if ( !checked ) {
                return
            }

            const
                path = await window.backend.files.realPath( file.path ),
                params = await window.backend.files.args( file.path ),
                dir = await window.backend.files.dir( file.path ),
                name = file.name.split( '.' ).slice( 0, -1 ).join( '.' ),
                parent = utils.find( this.folder?.id, this.library ) as TFolder,
                item = this.generate.link({
                    name,
                    path,
                    parent: this.folder?.id,
                    params,
                    dir
                })

            item.icon = await this.update.icon( item, file.path )

            parent.children = [ ...parent.children, item ]
            this.folder = parent

            this.save.library()
        }
    }
}

export default new Store()
