/* eslint-disable @typescript-eslint/ban-types */

declare global {
    interface Window {
        backend: Record<string, Record<string, Function>>
    }

    interface File {
        path: string
    }
}

import ReactDOM from 'react-dom/client'

import App from './App'

const
    root = ReactDOM.createRoot( document.getElementById( 'root' ) as HTMLElement )

root.render( <App /> )

window.addEventListener( 'DOMContentLoaded', () => {
    if ( window.location.href.split( '/' ).pop() === 'loader' ) {
        return
    }
    window.backend.ui.show()
})
