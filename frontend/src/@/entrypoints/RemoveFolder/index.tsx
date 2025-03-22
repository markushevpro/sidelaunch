import { RemoveFolderFlow } from 'src/@/flows/RemoveFolder'
import { Content }          from 'src/@/shared/ui-kit/Content'

export
function RemoveFolderWindow
()
{
    return (
        <Content fill>
            <RemoveFolderFlow />
        </Content>
    )
}
