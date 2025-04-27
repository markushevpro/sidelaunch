import { FormField }         from 'src/@/shared/ui-kit/FormField'
import { getValueFromInput } from 'src/@/shared/utils/inputs'

import type { DetailedHTMLProps, InputHTMLAttributes } from 'react'

interface PInputField
extends
Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onChange'>
{
    hidden?: boolean
    label: string
    onChange?: ( val: string ) => void
}

export
function InputField
({ hidden, label, onChange, ...rest }: PInputField )
{
    return (
        <FormField hidden={hidden} label={label}>
            <input { ...rest } onChange={ onChange ? getValueFromInput( onChange ) : onChange } />
        </FormField>
    )
}
