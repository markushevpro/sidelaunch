import { EditItemScreen } from 'src/@/screens/EditItem'
import { useItemWindow }  from 'src/@/services/window/useItemWindow'

export
function EditItemFlow
()
{
    const { item } = useItemWindow( 'Edit ' )

    if ( !item ) {
        return null
    }

    return (
        <EditItemScreen />
    )
}
