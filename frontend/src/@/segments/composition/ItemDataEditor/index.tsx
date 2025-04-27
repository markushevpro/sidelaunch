import { ChangedProvider } from 'src/@/segments/units/ChangedProvider'
import { useAppView }      from 'src/@/services/view/hook'

import { ItemEditorForm } from './ItemEditorForm'

export
function ItemDataEditor
()
{
    const { item } = useAppView()

    if ( !item ) {
        return null
    }

    return (
        <ChangedProvider component={ItemEditorForm} initial={item} />
    )
}
