import AutoLaunch from 'auto-launch'
import { app }    from 'electron'

import BFF from '../frontend/server'

import { backendMiddleware, Protocols, Tray } from './modules'
import { MainWindow }                         from './windows'

const
    devMode = process.env.NODE_ENV?.trim() === 'development' && !!process.env.NODE_ENV

const
    run = () => {
        if ( !devMode ) {
            checkAutoLaunch()
        } else {
            console.log( 'Skipping autolaunch in dev mode' )
        }

        Protocols.init()
        backendMiddleware.init()
        Tray.init()

        console.log( 'Server status', BFF.settings.env )

        MainWindow.show( 'http://127.0.0.1:9101', devMode )
    }

/* ---------------------------------------------- */

app.disableHardwareAcceleration()

app.whenReady().then(() => {
    run()
})

app.on( 'window-all-closed', () => {
    if ( process.platform !== 'darwin' ) { app.quit() }
})


function checkAutoLaunch () {
    const autoLaunch = new AutoLaunch({
        name:     'Sidelaunch',
        isHidden: true,
        path:     app.getPath( 'exe' ),
    })

    autoLaunch.isEnabled().then(( isEnabled: boolean ) => {
        if ( !isEnabled ) {
            autoLaunch.enable()
        }
    })
}
