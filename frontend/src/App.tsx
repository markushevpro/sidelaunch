import { ConfigProvider, theme }                from 'antd'
import { createBrowserRouter, RouterProvider, } from 'react-router-dom'

import { navigation } from 'pages'

import './App.scss'

const
    router = createBrowserRouter( navigation ),

    App = () => {
        return (
            <ConfigProvider
                theme = {{
                    token: {
                        colorPrimary:   '#F2994A',
                        colorLink:      'var(--primary)',
                        colorLinkHover: 'var(--primary-light)'
                    },
                    algorithm: [ theme.darkAlgorithm ]
                }}
            >
                <RouterProvider router={router} />
            </ConfigProvider>
        )
    }

export default App
