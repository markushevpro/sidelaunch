import BaseWindow from './window.class'

class Rename extends BaseWindow {
    show = async ( url: string, debug: boolean ) => {
        if ( !this.ref || this.ref?.isDestroyed()) {
            this.createWindow( url, debug, {
                x:      void 0,
                y:      void 0,
                center: true,
                width:  320,
                height: 185,
                show:   false
            })
        } else {
            ( url ) && ( this.ref.loadURL( url ))
            ;( debug ) && this.ref.webContents.openDevTools({ mode: 'detach' })
        }

        this.ref?.once( 'ready-to-show', () => {
            this.ref?.show()
        })
    }
}

export default new Rename()
