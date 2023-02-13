/* eslint-disable @typescript-eslint/no-explicit-any */
import { ipcMain } from 'electron'

import Backend from '../../../backend'

const init = () => {

    Object.keys( Backend ).forEach( top => {
        Object.keys(( Backend as any )[ top ]).forEach( key => {
            ipcMain.handle( `${top.toLowerCase()}.${key}`, async ( _, ...args ) => {
                console.log( `Receive "${top}.${key}" event` )
                return await ( Backend as any )[ top ][ key ]( ...args )
            })
        })
    })
}

export default { init }
