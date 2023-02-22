import { ipcMain } from 'electron'

type TWEventHandler = () => void

type TWindowEvents = {
    [name: string]: TWEventHandler[]
}

class GlobalEvents {

    listeners: TWindowEvents = {}

    watch = ( name: string, handler: TWEventHandler ) => {
        this.initEvent( name )

        if ( !this.exist( name, handler )) {
            this.listeners[ name ].push( handler )
        }
    }

    exist = ( name: string, handler: TWEventHandler ) => !this.listeners[ name ].includes( handler )

    initEvent = ( name: string ) => {
        if ( !this.listeners[ name ]) {
            this.listeners[ name ] = []

            ipcMain.handle( name, () => {
                this.listeners[ name ].forEach(( handler: TWEventHandler ) => handler())
            })
        }
    }

}

export default new GlobalEvents()
