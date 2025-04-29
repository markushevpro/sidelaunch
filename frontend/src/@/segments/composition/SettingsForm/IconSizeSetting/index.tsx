import { IconButton }  from 'src/@/segments/units/IconButton'
import { SliderField } from 'src/@/segments/units/SliderField'
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
    const { icon, markers, update } = useIconSizeSetting()

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

            <SliderField
                label="Icone size:"
                markers={markers}
                max={48}
                min={16}
                unit="pixels"
                value={value}
                onChange={onChange}
            />
        </Stack>
    )
}
