import { FolderScreen }  from 'src/@/screens/Folder'
import { PreloadImages } from 'src/@/segments/features/PreloadImages'

export
function ViewFolderFlow
()
{
    return (
        <PreloadImages>
            <FolderScreen />
        </PreloadImages>
    )
}
