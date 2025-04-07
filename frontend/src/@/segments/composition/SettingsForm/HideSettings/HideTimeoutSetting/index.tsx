import { FormField }   from 'src/@/segments/composition/FormField'
import { SliderInput } from 'src/@/shared/ui-kit/SliderInput'

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
        // eslint-disable-next-line react/jsx-one-expression-per-line
        <FormField className={styles.container} label={<>Hide timeout: <span>{value} seconds</span></>}>
            <SliderInput
                markers={markers}
                max={markers.length - 1}
                min={0}
                value={val}
                onChange={change}
            />
        </FormField>
    )
}
