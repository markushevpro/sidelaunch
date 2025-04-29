import { FormField }         from 'src/@/shared/ui-kit/FormField'
import { getValueFromInput } from 'src/@/shared/utils/inputs'

import type { DetailedHTMLProps, InputHTMLAttributes, MutableRefObject, PropsWithChildren } from 'react'

interface PInputField
extends
Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onChange'>,
PropsWithChildren
{
    hidden?: boolean
    label: string
    inputRef?: MutableRefObject<HTMLInputElement | null>
    onChange?: ( val: string ) => void
}

export
function InputField
({ hidden, label, children, onChange, inputRef, ...rest }: PInputField )
{
    return (
        <FormField hidden={hidden} label={label}>
            <input { ...rest } ref={inputRef} onChange={ onChange ? getValueFromInput( onChange ) : onChange } />
            { children }
        </FormField>
    )
}
