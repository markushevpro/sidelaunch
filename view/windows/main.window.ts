/* eslint-disable no-prototype-builtins */
import fs   from 'fs'
import path from 'path'

import { screen, ipcMain, Menu, MenuItem } from 'electron'
import { DisableMinimize }                 from 'electron-disable-minimize'

import { TFolder, TItem } from 'models'

import Backend          from '../../backend'
import { IorF, isItem } from '../../tools'

import AskDialog    from './ask.window'
import RenameDialog from './rename.window'
import BaseWindow   from './window.class'


const FolderIcon = `data:image/png;base64,${fs.readFileSync( path.resolve( __dirname, '../../assets/folder.png' )).toString( 'base64' )}`

class Main extends BaseWindow {
    url?: string
    debug = false

    display?: Electron.Display
    size?: number
    menus: Record<string, Menu> = {}

    touchSize = 1
    offset = 0
    state = 0
    speed = 5
    debounceTime = 300

    _debounce: ReturnType<typeof setTimeout> | null = null
    _timer: ReturnType<typeof setInterval> | null = null
    _lockedMinimize = false
    _item: TItem | TFolder | null = null
    _lockScroll = false

    show = async ( url: string, debug: boolean ) => {
        this.url = url
        this.debug = debug

        await this.init.prepare()

        this.createWindow( url, debug, {
            frame:       false,
            alwaysOnTop: true,
            focusable:   false,
        })

        this.ref?.setAlwaysOnTop( true )

        this.init.contextMenu()
        this.init.events()
        this.init.windows()
    }

    init = {
        prepare: async () => {
            this.size = +( await Backend.Config.get( 'iconSize' )) + 32
            this.offset = -this.size + this.touchSize
            this.display = await this.findDisplay()
        },

        windows: () => {
            RenameDialog.init()
            AskDialog.init()
        },

        events: () => {
            this.events.common()
            this.events.backend()
            this.events.listen()
        },

        contextMenu: () => {
            this.menus.itemMenu = Menu.buildFromTemplate([
                {
                    label: 'Rename',
                    click: () => {
                        if ( !this._item ) { return }
                        IorF(
                            this._item,
                            () => RenameDialog.show( `${this.url}/rename/item/${this._item?.id}`, this.debug ),
                            () => RenameDialog.show( `${this.url}/rename/folder/${this._item?.id}`, this.debug )
                        )
                    }
                },
                {
                    label: 'Change icon',
                    click: () => {
                        if ( !this._item ) { return }
                        this.ref?.webContents.send( 'changeIcon', JSON.stringify( this._item ))
                    }
                },
                {
                    id:    'clearIcon',
                    label: 'Clear icon',
                    click: () => {
                        if ( !this._item ) { return }
                        Backend.Folders.setIcon( this._item.id, FolderIcon )
                    }
                },
                {
                    id:    'filePath',
                    label: 'Reveal in File Exporer',
                    click: () => {
                        if ( !this._item ) { return }
                        Backend.FS.openPath(( this._item as TItem ).path )
                    }
                },
                { type: 'separator' },
                {
                    label: 'Remove',
                    click: () => {
                        if ( !this._item ) { return }

                        IorF(
                            this._item,
                            () => {
                                if ( !this._item ) { return }

                                this.ref?.webContents.send( 'removeItem', this._item.id )

                                Backend.Items.remove( this._item.id ).then(() => {
                                    this._item = null
                                    this.ref?.webContents.send( 'reloadItems' )
                                })
                            },
                            () => {
                                if ( !this._item ) { return }

                                if (( this._item as TFolder ).children.length > 0 || ( this._item as TFolder ).subdirs.length > 0 ) {
                                    AskDialog.show(
                                        `${this.url}/ask`,
                                        `You are going to remove ${this._item.name} folder. Do you want remove files inside or move it to parent folder?`,
                                        {
                                            'move':   'Move up',
                                            'remove': 'Remove',
                                        },
                                        this.debug
                                    )

                                    ipcMain.handleOnce( 'ui.answer', ( _, result ) => {
                                        if ( !this._item ) { return }

                                        switch ( result ) {
                                            case 'remove':
                                                this.ref?.webContents.send( 'removeFolder', this._item.id )

                                                Backend.Folders.removeRecoursive( this._item.id ).then(() => {
                                                    this._item = null
                                                    this.ref?.webContents.send( 'reload' )
                                                })
                                                break

                                            case 'move':
                                                this.ref?.webContents.send( 'removeFolder', this._item.id )

                                                Backend.Folders.remove( this._item.id ).then(() => {
                                                    this._item = null
                                                    this.ref?.webContents.send( 'reloadFolders' )
                                                })
                                                break

                                            default:
                                                //Do nothing
                                        }
                                    })
                                } else {
                                    this.ref?.webContents.send( 'removeFolder', this._item.id )

                                    Backend.Folders.remove( this._item.id ).then(() => {
                                        this._item = null
                                        this.ref?.webContents.send( 'reloadFolders' )
                                    })
                                }

                                /**/
                            }
                        )
                    }
                }
            ])

            this.menus.itemMenu.on( 'menu-will-show', () => {
                this._lockScroll = true
            })

            this.menus.itemMenu.on( 'menu-will-close', () => {
                this._lockScroll = false
            })
        }
    }

    events = {
        common: () => {
            if ( !this.ref ) { return }

            screen.on( 'display-metrics-changed', async () => {
                this.display = await this.findDisplay()
                this.move.in()
            })

            this.ref.once( 'ready-to-show', () => {
                this.lockMin()
                this.move.out()
                this.ref?.show()
            })
        },

        backend: () => {
            Backend.Items.onUpdate(() => this.ref?.webContents.send( 'reloadItems' ))
            Backend.Folders.onUpdate(() => this.ref?.webContents.send( 'reload' ))
        },

        listen: () => {
            ipcMain.handle( 'ui.movein', () => {
                return this.move.in()
            })

            ipcMain.handle( 'ui.moveout', () => {
                return this.move.out()
            })

            ipcMain.handle( 'ui.itemMenu', ( _, itemJSON: string ) => {
                const
                    item: TItem | TFolder = JSON.parse( itemJSON )

                this._item = item
                this.menu.flush()
                this.menu.toggle( this.menus.itemMenu, [ 'clearIcon' ], !isItem( item ))
                this.menu.toggle( this.menus.itemMenu, [ 'filePath' ], isItem( item ))
                this.menus.itemMenu.popup({ window: this.ref })
            })

            ipcMain.handle( 'ui.askForMultiple', ( _, length ) => {
                return new Promise(( resolve ) => {
                    AskDialog.show(
                        `${this.url}/ask`,
                        `Do you want to add ${length} file${length === 1 ? 's' : ''} as new folder or add them separately?`,
                        {
                            'separate': 'Separated',
                            'folder':   'New folder'
                        },
                        this.debug
                    )

                    ipcMain.handleOnce( 'ui.answer', ( _, result ) => {
                        resolve( result )
                    })
                })
            })
        }
    }

    move = {
        step: () => {
            if ( !this.display || !this.size ) { return }

            this.offset -= this.state * this.speed

            if ( this.offset <= -this.size + this.touchSize || this.offset >= 0 ) {
                this.state = 0
                this.offset >= 0 ? this.offset = 0 : this.offset = -this.size + this.touchSize
                this._timer && clearInterval( this._timer )
            }

            if ( this.ref?.isDestroyed()) { return }

            this.ref?.setBounds({
                x:      this.display.workArea.x + this.offset,
                y:      this.display === screen.getPrimaryDisplay() ? 0 : this.display.workArea.y,
                width:  this.size,
                height: this.display.workArea.height,
            }, true )
        },

        start: ( state: number ) => {
            this.state = state
            this._timer = setInterval(() => this.move.step(), 17 )
        },

        out: () => {
            if ( this._lockScroll ) { return }
            if ( this._debounce ) { clearTimeout( this._debounce ) }

            this._debounce = setTimeout(() => this.move.start( 1 ), this.debounceTime )
        },

        in: () => {
            this._debounce && clearTimeout( this._debounce )
            this.move.start( -2 )
        }
    }

    menu = {
        flush: () => Object.keys( this.menus ).forEach( key => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ( this.menus as any )[ key ].items.forEach(( item: MenuItem ) => item.visible = true )
        }),
        toggle: ( menu: Menu, ids: string[], state: boolean ) => {
            menu.items.forEach( item => {
                if ( ids.includes( item.id )) {
                    item.visible = state
                }
            })
        }
    }

    lockMin = () => {
        if ( !this.ref || this._lockedMinimize || this.ref.isDestroyed()) { return }

        const
            hwnd = this.ref.getNativeWindowHandle()

        this.ref.show()
        this.ref.focus()

        const
            res = DisableMinimize( hwnd )

            ;( res )
            ? this._lockedMinimize = true
            : setTimeout(() => this.lockMin(), 400 )
    }

    findDisplay = async () => {
        const
            displays = screen.getAllDisplays(),
            position = await Backend.Config.get( 'position' )

        switch ( position ) {
            case 'left':
                return displays.reduce(( left, cur ) => cur.workArea.x < left.workArea.x ? cur : left, displays[ 0 ])
            case 'right':
            default:
                return displays.reduce(( right, cur ) => cur.workArea.x + cur.workArea.width > right.workArea.x + right.workArea.width ? cur : right, displays[ 0 ])
        }
    }
}

export default new Main()
