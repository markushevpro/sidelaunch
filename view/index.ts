import { app } from 'electron'

import BFF from '../frontend/server'

import { backendMiddleware, Protocols, Tray } from './modules'
import { MainWindow }                         from './windows'

const
    devMode = process.env.NODE_ENV?.trim() === 'development' && !!process.env.NODE_ENV

const run = () => {
    Protocols.init()
    backendMiddleware.init()
    Tray.init()

    ;( BFF ) && ( console.log( 'I see local server' ))

    MainWindow.show( 'http://127.0.0.1:9101', devMode )
}

/* ---------------------------------------------- */

app.whenReady().then(() => {
    run()
})

app.on( 'window-all-closed', () => {
    if ( process.platform !== 'darwin' ) { app.quit() }
})
