import { useCallback, useMemo } from 'react'

import { FormField }   from 'src/@/shared/ui-kit/FormField'
import { SliderInput } from 'src/@/shared/ui-kit/SliderInput'

import type { DetailedHTMLProps, InputHTMLAttributes, PropsWithChildren, ComponentProps } from 'react'

interface PSliderField
extends
Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onChange' | 'min' | 'max'>,
Omit<ComponentProps<typeof SliderInput>, 'onChange'>,
PropsWithChildren
{
    label?: string
    unit?: string
    hidden?: boolean
    value: number
    visibleValue?: string | number
    onChange?: ( val: number ) => void
}

export
function SliderField
({ hidden, label, unit, value, visibleValue, children, className, onChange, ...rest }: PSliderField )
{
    const jsxlabel = useMemo(
        () => (
            <>
                {label}

                <span>
                    { visibleValue ?? value }
                    {' '}
                    {unit}
                </span>
            </>
        ),
        [ label, unit, value, visibleValue ]
    )

    const change = useCallback(
        ( value: string ) => {
            onChange?.( Number( value ))
        },
        [ onChange ]
    )

    return (
        <FormField className={className} hidden={hidden} label={jsxlabel}>
            <SliderInput
                {...rest}
                value={value}
                onChange={change}
            />
        </FormField>
    )
}
