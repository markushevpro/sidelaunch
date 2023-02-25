import BaseWindow from './window.class'

class Rename extends BaseWindow {
    show = async ( url: string, debug: boolean ) => {
        this.createWindow( url, debug, {
            x:      void 0,
            y:      void 0,
            center: true,
            width:  320,
            height: 185,
            show:   false
        })

        this.ref?.once( 'ready-to-show', () => {
            this.ref?.show()
        })
    }
}

export default new Rename()
