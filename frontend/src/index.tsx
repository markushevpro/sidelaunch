import ReactDOM from 'react-dom/client'

import App from './App'

declare global {

    interface Window {
        // eslint-disable-next-line @typescript-eslint/ban-types
        backend: Record<string, Record<string, Function>>
    }

    interface File {
        path: string
    }
}


const
    root = ReactDOM.createRoot( document.getElementById( 'root' ) as HTMLElement )

root.render( <App /> )
