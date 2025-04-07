import { EditWindow }         from './@/entrypoints/Edit'
import { MainWindow }         from './@/entrypoints/Main'
import { RemoveFolderWindow } from './@/entrypoints/RemoveFolder'
import { SettingsWindow }     from './@/entrypoints/Settings'
import './@/shared/styles/global.css'
import './@/shared/styles/theme.css'
// eslint-disable-next-line align-import/align-import
import { usePageData } from './@/shared/utils/routes'

function App
()
{
    const { page } = usePageData()

    if ( !page ) {
        return null
    }

    switch ( page ) {
        case 'settings':
            return (
                <SettingsWindow />
            )

        case 'edit':
            return (
                <EditWindow />
            )

        case 'removefolder':
            return (
                <RemoveFolderWindow />
            )

        case 'list':
        default:
            return (
                <MainWindow />
            )
    }
}

// eslint-disable-next-line import/no-default-export
export default App
