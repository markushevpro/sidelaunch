import { FormField } from 'src/@/segments/composition/FormField'

import type { ChangeEvent } from 'react'

type SupportedFields = 'path' | 'dir' | 'params'

interface PAppItemFields
{
    loading: boolean
    values: Record<SupportedFields, string | undefined>
    onChange: Record<SupportedFields, ( e: ChangeEvent<HTMLInputElement> ) => void>
}

export
function AppItemFields
({ loading, values, onChange }: PAppItemFields )
{
    return (
        <>
            <FormField label="Path">
                <input
                    disabled={loading}
                    type="text"
                    value={values.path}
                    onChange={onChange.path}
                />
            </FormField>

            <FormField label="Working directory">
                <input
                    disabled={loading}
                    type="text"
                    value={values.dir}
                    onChange={onChange.dir}
                />
            </FormField>

            <FormField label="Arguments">
                <input
                    disabled={loading}
                    type="text"
                    value={values.params}
                    onChange={onChange.params}
                />
            </FormField>
        </>
    )
}
