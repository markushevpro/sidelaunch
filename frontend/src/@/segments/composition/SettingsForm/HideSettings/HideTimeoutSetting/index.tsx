import { SliderField } from 'src/@/segments/units/SliderField'

import styles                    from './hide-timeout-setting.module.css'
import { useHideTimeoutSetting } from './hook'

interface PHideTimeoutSetting
{
    value: number
    onChange:( value: number ) => void
}

export
function HideTimeoutSetting
({ value, onChange }: PHideTimeoutSetting )
{
    const { val, markers, change } = useHideTimeoutSetting( value, onChange )

    return (
        <SliderField
            className={styles.container}
            label="Hide timeout:"
            markers={markers}
            max={markers.length - 1}
            min={0}
            unit="seconds"
            value={val}
            visibleValue={value}
            onChange={change}
        />
    )
}
