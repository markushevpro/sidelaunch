import { EditItemFlow } from 'src/@/flows/EditItem'
import { Content }      from 'src/@/shared/ui-kit/Content'

import { useEditWindow } from './hook'

export
function EditWindow
()
{
    const { item } = useEditWindow()

    if ( !item ) {
        return null
    }

    return (
        <Content>
            <EditItemFlow />
        </Content>
    )
}
