import { InputField } from 'src/@/segments/units/InputField'

import type { ChangedProps } from 'src/@/segments/units/ChangedProvider/types'
import type { ListItem }     from 'src/@/shared/types/items'

interface PSharedItemFields
extends
ChangedProps<ListItem, 'name'>
{
    loading: boolean
}

export
function SharedItemFields
({ data, loading, onChange }: PSharedItemFields )
{
    return (
        <>
            <InputField
                disabled
                hidden
                readOnly
                label="ID"
                type="text"
                value={data.id}
            />

            <InputField
                disabled={loading}
                label="Name"
                type="text"
                value={data.name}
                onChange={ onChange( 'name' )}
            />
        </>
    )
}
