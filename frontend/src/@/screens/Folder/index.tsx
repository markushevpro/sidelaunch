import { CurrentFolderItems } from 'src/@/segments/composition/CurrentFolderItems'
import { BackButton }         from 'src/@/segments/features/BackButton'
import { CreateFolderButton } from 'src/@/segments/features/CreateFolderButton'
import { RemoveArea }         from 'src/@/segments/features/RemoveArea'
import { Fill }               from 'src/@/shared/ui-kit/Fill'
import { Scrollable }         from 'src/@/shared/ui-kit/Scrollable'

export
function FolderScreen
()
{
    return (
        <Fill>
            <BackButton />

            <Scrollable>
                <CurrentFolderItems />
            </Scrollable>

            <CreateFolderButton />
            <RemoveArea />
        </Fill>
    )
}
