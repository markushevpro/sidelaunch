import { ViewFolderFlow }     from 'src/@/flows/ViewFolder'
import { EnableDnD }          from 'src/@/segments/features/EnableDnD'
import { PositionController } from 'src/@/segments/features/PositionController'
import { ReloadProvider }     from 'src/@/segments/features/ReloadProvider'
import { useLibrary }         from 'src/@/services/library/hook'

export
function MainWindow
()
{
    useLibrary()

    return (
        <ReloadProvider>
            <PositionController>
                <EnableDnD>
                    <ViewFolderFlow />
                </EnableDnD>
            </PositionController>
        </ReloadProvider>
    )
}
