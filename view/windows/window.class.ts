import path from 'path'

import { BrowserWindowConstructorOptions, BrowserWindow } from 'electron'

const
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
        webPreferences:  {
            preload:          path.resolve( __dirname, '../modules/middleware/frontend.middleware.js' ),
            contextIsolation: true,
            sandbox:          true
        },
    }

class BaseWindow {
    ref?: Electron.BrowserWindow

    createWindow = ( url?: string, debug?: boolean, config?: BrowserWindowConstructorOptions ) => {
        this.ref = new BrowserWindow({
            ...defaultOptions,
            ...( config || {})
        })

        this.ref.removeMenu()

        ;( url ) && ( this.ref.loadURL( url ))
        ;( debug ) && this.ref.webContents.openDevTools({ mode: 'detach' })
    }
}

export default BaseWindow
