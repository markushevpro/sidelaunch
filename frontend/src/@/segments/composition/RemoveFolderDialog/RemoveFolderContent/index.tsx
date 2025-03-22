import { FolderItems } from 'src/@/segments/composition/FolderItems'

import { useRemoveFolderContent } from './hook'

export
function RemoveFolderContent
()
{
    const { name, info, folder } = useRemoveFolderContent()

    return (
        <>
            <p>
                {`You are going to remove folder ${name} with ${info}.`}
            </p>

            <FolderItems folder={folder} max={16} />
        </>
    )
}
