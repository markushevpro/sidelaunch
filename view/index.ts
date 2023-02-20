import { app, protocol } from 'electron'

import BFF from '../frontend/server'

import { backendMiddleware, Tray } from './modules'
import { MainWindow }              from './windows'

const
    devMode = process.env.NODE_ENV?.trim() === 'development' && !!process.env.NODE_ENV

const run = () => {

    backendMiddleware.init()
    Tray.init()
    ;( BFF ) && ( console.log( 'I see local server' ))
    MainWindow.show( 'http://127.0.0.1:9101', devMode )
}

/* ---------------------------------------------- */

app.whenReady().then(() => {
    protocol.registerFileProtocol( 'image', ( request, callback ) => {
        const pathname = request.url.replace( 'image://', '' )
        callback( pathname )
    })

    run()
})

app.on( 'window-all-closed', () => {
    if ( process.platform !== 'darwin' ) { app.quit() }
})
