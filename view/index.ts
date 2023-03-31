import { app, BrowserWindow } from 'electron'

import BFF from '../frontend/server'

import { backendMiddleware, Protocols, Tray } from './modules'
import { MainWindow }                         from './windows'

const
    devMode = process.env.NODE_ENV?.trim() === 'development' && !!process.env.NODE_ENV

let splash: BrowserWindow | undefined

const
    run = () => {
        Protocols.init()
        backendMiddleware.init()
        Tray.init()

        ;( BFF ) && ( console.log( 'I see local server' ))

        MainWindow.show( 'http://127.0.0.1:9101', devMode, () => {
            splash?.destroy()
        })
    }

/* ---------------------------------------------- */

app.whenReady().then(() => {
    splash = new BrowserWindow({
        width:       512,
        height:      512,
        transparent: true,
        frame:       false,
        alwaysOnTop: true,
        show:        true
    })
    splash.loadURL( `file://${__dirname}/splash.html` )

    run()
})

app.on( 'window-all-closed', () => {
    if ( process.platform !== 'darwin' ) { app.quit() }
})
