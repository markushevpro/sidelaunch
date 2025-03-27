import cn from 'classnames'

import { ListButton } from 'src/@/segments/units/ListButton'
import { Plus }       from 'src/@/shared/ui-kit/icons/Plus'

import styles                    from './create-folder-button.module.css'
import { useCreateFolderButton } from './hook'

export
function CreateFolderButton
()
{
    const { show, hidden, add } = useCreateFolderButton()

    if ( !show ) {
        return null
    }

    return (
        <ListButton className={cn( styles.addbtn, hidden && styles.hidden )} onClick={add}>
            <Plus />
        </ListButton>
    )
}
