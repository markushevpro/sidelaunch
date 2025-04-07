import { FormField }   from 'src/@/segments/composition/FormField'
import { IconButton }  from 'src/@/segments/units/IconButton'
import { SliderInput } from 'src/@/shared/ui-kit/SliderInput'
import { Stack }       from 'src/@/shared/ui-kit/Stack'

import { useIconSizeSetting } from './hook'
import styles                 from './icon-size-setting.module.css'

interface PIconSizeSetting
{
    value: number
    onChange:( value: number ) => void
}

export
function IconSizeSetting
({ value, onChange }: PIconSizeSetting )
{
    const { icon, markers, update, change } = useIconSizeSetting( onChange )

    return (
        <Stack className={styles.container}>
            <IconButton
                className={styles.button}
                height={value}
                icon={icon}
                width={value}
                onClick={update}
                onError={update}
            />

            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
            <FormField label={<>Icon size: <span>{value} pixels</span></>}>
                <SliderInput
                    markers={markers}
                    max={48}
                    min={16}
                    value={value}
                    onChange={change}
                />
            </FormField>
        </Stack>
    )
}
