import path from 'path'

import { BrowserWindowConstructorOptions, BrowserWindow, nativeImage } from 'electron'

import Backend from '../../backend'


const
    iconPath = path.resolve( Backend.FS.appPath(), 'assets/icon.png' ),
    icon = nativeImage.createFromPath( iconPath ),
    defaultOptions: BrowserWindowConstructorOptions = {
        x:               -9999,
        y:               -9999,
        width:           1,
        height:          1,
        backgroundColor: '#191919',
        frame:           true,
        resizable:       false,
        show:            false,
        alwaysOnTop:     false,
        focusable:       true,
        transparent:     false,
        icon,
        webPreferences:  {
            preload:          path.resolve( __dirname, '../modules/middleware/frontend.middleware.js' ),
            contextIsolation: true,
            sandbox:          true
        },
    }

class BaseWindow {
    ref?: Electron.BrowserWindow

    createWindow = ( url?: string, debug?: boolean, config?: BrowserWindowConstructorOptions, onShow?: () => void ) => {
        this.ref = new BrowserWindow({
            ...defaultOptions,
            ...( config || {})
        })

        ;( onShow ) && ( this.ref.on( 'ready-to-show', onShow ))

        this.ref.removeMenu()
        this.ref.setIcon( iconPath )

        ;( url ) && ( this.ref.loadURL( url ))
        ;( debug ) && this.ref.webContents.openDevTools({ mode: 'detach' })
    }
}

export default BaseWindow
