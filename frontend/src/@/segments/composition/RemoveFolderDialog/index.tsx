import { Dialog }     from 'src/@/segments/composition/Dialog'
import { useAppView } from 'src/@/services/view/hook'

import { RemoveFolderButtons } from './RemoveFolderButtons'
import { RemoveFolderContent } from './RemoveFolderContent'

export
function RemoveFolderDialog
()
{
    const { item } = useAppView()

    if ( !item ) {
        return null
    }

    return (
        <Dialog footer={<RemoveFolderButtons />}>
            <RemoveFolderContent />
        </Dialog>
    )
}
