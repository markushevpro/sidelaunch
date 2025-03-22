import { RemoveFolderScreen } from 'src/@/screens/RemoveFolder'
import { useItemWindow }      from 'src/@/services/window/useItemWindow'

export
function RemoveFolderFlow
()
{
    const { item } = useItemWindow( 'Remove ' )

    if ( !item ) {
        return null
    }

    return (
        <RemoveFolderScreen />
    )
}
