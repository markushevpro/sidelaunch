import BaseWindow from './window.class'

class Ask extends BaseWindow {

    init = () => {
        this.createWindow( void 0, void 0, {
            x:           void 0,
            y:           void 0,
            center:      true,
            width:       320,
            height:      185,
            alwaysOnTop: true,
            show:        false
        })
    }

    show = async ( url: string, text: string, buttons: Record<string, string>, debug: boolean ) => {
        if ( !this.ref ) { return }

        this.ref.loadURL( `${url}?text=${text}&buttons=${this.buttons( buttons )}` )
        ;( debug ) && this.ref.webContents.openDevTools({ mode: 'detach' })

        this.ref.once( 'ready-to-show', () => {
            this.ref?.show()
        })
    }

    buttons = ( list: Record<string, string> ) => {
        const
            res: string[] = []

        Object.keys( list ).forEach( key => {
            res.push( `${key}:${list[ key ]}` )
        })

        return res.join( ';' )
    }
}

export default new Ask()
