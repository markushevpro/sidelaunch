import { ViewFolderFlow }     from 'src/@/flows/ViewFolder'
import { PositionController } from 'src/@/segments/features/PositionController'
import { useLibrary }         from 'src/@/services/library/hook'

export
function MainPage
()
{
    useLibrary()

    return (
        <PositionController>
            <ViewFolderFlow />
        </PositionController>
    )
}
