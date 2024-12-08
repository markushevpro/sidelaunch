import React          from 'react'
import { createRoot } from 'react-dom/client'

import type * as runtime from '../wailsjs/runtime/runtime'

import App from './App'
import './global.css'

declare global {
    interface Window {
        runtime: typeof runtime
    }
    interface Screen {
        availLeft: number
    }
}

const container = document.getElementById( 'root' )

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot( container! )

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
