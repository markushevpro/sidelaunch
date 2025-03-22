import { RemoveFolderFlow } from 'src/@/flows/RemoveFolder'
import { Content }          from 'src/@/shared/ui-kit/Content'

import { useRemoveFolderWindow } from './hook'

export
function RemoveFolderWindow
()
{
    const { item } = useRemoveFolderWindow()

    if ( !item ) {
        return null
    }

    return (
        <Content fill>
            <RemoveFolderFlow />
        </Content>
    )
}
