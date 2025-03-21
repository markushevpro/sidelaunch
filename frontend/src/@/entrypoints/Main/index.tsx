import { ViewFolderFlow }     from 'src/@/flows/ViewFolder'
import { EnableDnD }          from 'src/@/segments/features/EnableDnD'
import { PositionController } from 'src/@/segments/features/PositionController'
import { useLibrary }         from 'src/@/services/library/hook'

export
function MainWindow
()
{
    useLibrary()

    return (
        <PositionController>
            <EnableDnD>
                <ViewFolderFlow />
            </EnableDnD>
        </PositionController>
    )
}
