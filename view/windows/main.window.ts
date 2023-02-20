/* eslint-disable no-prototype-builtins */
import { screen, ipcMain, Menu, MenuItem } from 'electron'
import { DisableMinimize }                 from 'electron-disable-minimize'

import { TItem } from 'models'

import Backend      from '../../backend'
import { isFolder } from '../../tools'


import AskDialog    from './ask.window'
import contextMenu  from './modules/context-menu'
import RenameDialog from './rename.window'
import BaseWindow   from './window.class'

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
    _item: TItem | null = null
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
            this.events.listen()
        },

        contextMenu: () => {
            this.menus.itemMenu = contextMenu( this )

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

        listen: () => {
            ipcMain.handle( 'ui.movein', () => {
                return this.move.in()
            })

            ipcMain.handle( 'ui.moveout', () => {
                return this.move.out()
            })

            ipcMain.handle( 'ui.itemMenu', ( _, itemJSON: string ) => {
                const
                    item: TItem = JSON.parse( itemJSON )

                this._item = item

                this.menu.flush()
                this.menu.toggle( this.menus.itemMenu, [ 'clearIcon' ], isFolder( item ))
                this.menu.toggle( this.menus.itemMenu, [ 'changeArgs' ], !isFolder( item ))
                this.menu.toggle( this.menus.itemMenu, [ 'filePath' ], !isFolder( item ))

                this.menus.itemMenu.popup({ window: this.ref })
            })

            ipcMain.handle( 'ui.askForMultiple', ( _, length ) => {
                return new Promise(( resolve ) => {
                    AskDialog.show(
                        `${this.url}/ask`,
                        `Do you want to add ${length} file${length === 1 ? 's' : ''} as new folder or add them to current?`,
                        {
                            'separate': 'Put here',
                            'folder':   'Create new subfolder'
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
