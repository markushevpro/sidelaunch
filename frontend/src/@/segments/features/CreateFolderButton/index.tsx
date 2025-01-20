import { IconItem } from 'src/@/segments/units/IconItem'

import { useCreateFolderButton } from './hook'

export
function CreateFolderButton
()
{
    const { visible, add } = useCreateFolderButton()

    if ( !visible ) {
        return null
    }

    return (
        <IconItem onClick={add}>
            +
        </IconItem>
    )
}
