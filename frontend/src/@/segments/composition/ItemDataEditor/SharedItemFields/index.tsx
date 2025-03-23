import { FormField }         from 'src/@/segments/composition/FormField'
import { getValueFromInput } from 'src/@/shared/utils/inputs'

import type { ListItem } from 'src/@/shared/types/items'

type SupportedFields = 'name'

interface PSharedItemFields
{
    item: ListItem
    loading: boolean
    values: Record<SupportedFields, string | undefined>
    onChange: Record<SupportedFields, ( val: string ) => void>
}

export
function SharedItemFields
({ item, values, loading, onChange }: PSharedItemFields )
{
    return (
        <>
            <FormField label="ID">
                <input
                    disabled
                    readOnly
                    type="text"
                    value={item.id}
                />
            </FormField>

            <FormField label="Name">
                <input
                    disabled={loading}
                    type="text"
                    value={values.name}
                    onChange={getValueFromInput( onChange.name )}
                />
            </FormField>
        </>
    )
}
