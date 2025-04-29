import { InputField } from 'src/@/segments/units/InputField'

import type { ChangedProps } from 'src/@/segments/units/ChangedProvider/types'
import type { AppItem }      from 'src/@/shared/types/items'

import { ProtocolError }    from './ProtocolError'
import { useUrlItemFields } from './hook'

interface PUrlItemFields
extends
ChangedProps<AppItem, 'path'>
{
    loading: boolean
}

export
function UrlItemFields
({ loading, data, onChange }: PUrlItemFields )
{
    const { ref } = useUrlItemFields()

    return (
        <>
            <InputField
                disabled={loading}
                inputRef={ref}
                label="Url"
                type="text"
                value={data.path}
                onChange={onChange( 'path' )}
            />

            <ProtocolError value={data.path} />
        </>
    )
}
