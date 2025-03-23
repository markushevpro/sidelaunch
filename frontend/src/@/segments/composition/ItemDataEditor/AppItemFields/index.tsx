import { FormField }         from 'src/@/segments/composition/FormField'
import { Button }            from 'src/@/shared/ui-kit/Button'
import { getValueFromInput } from 'src/@/shared/utils/inputs'

import { useAppItemFields } from './hook'

type SupportedFields = 'path' | 'dir' | 'params'

interface PAppItemFields
{
    loading: boolean
    values: Record<SupportedFields, string | undefined>
    onChange: Record<SupportedFields, ( val: string ) => void>
}

export
function AppItemFields
({ loading, values, onChange }: PAppItemFields )
{
    const { searchFile, searchDir } = useAppItemFields()

    return (
        <>
            <FormField label="Path">
                <input
                    disabled={loading}
                    type="text"
                    value={values.path}
                    onChange={getValueFromInput( onChange.path )}
                />

                <Button onClick={searchFile( onChange.path )}>...</Button>
            </FormField>

            <FormField label="Working directory">
                <input
                    disabled={loading}
                    type="text"
                    value={values.dir}
                    onChange={getValueFromInput( onChange.dir )}
                />

                <Button onClick={searchDir( onChange.dir )}>...</Button>
            </FormField>

            <FormField label="Arguments">
                <input
                    disabled={loading}
                    type="text"
                    value={values.params}
                    onChange={getValueFromInput( onChange.params )}
                />
            </FormField>
        </>
    )
}
