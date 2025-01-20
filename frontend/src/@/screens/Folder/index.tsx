import { CurrentFolderItems } from 'src/@/segments/composition/CurrentFolderItems'
import { BackButton }         from 'src/@/segments/features/BackButton'
import { CreateFolderButton } from 'src/@/segments/features/CreateFolderButton'

export
function FolderScreen
()
{
    return (
        <div>
            <BackButton />
            <CurrentFolderItems />
            <CreateFolderButton />
        </div>
    )
}
