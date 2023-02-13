import { RouteObject } from 'react-router-dom'

import AskDialog    from './Ask/Ask.dialog'
import MainPage     from './Main/Main.page'
import RenameDialog from './Rename/Rename.dialog'

const
    navigation: RouteObject[] = [
        {
            path:    '/',
            element: <MainPage />
        },
        {
            path:    '/rename/:type/:id',
            element: <RenameDialog />
        },
        {
            path:    '/ask',
            element: <AskDialog />
        }
    ]

export { navigation }
