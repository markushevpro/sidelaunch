import { useCallback } from 'react'

import { Checkbox } from 'src/@/shared/ui-kit/Checkbox'

import styles from './fixed-toggle.module.css'

interface PFixedToggle
{
    checked: boolean
    onChange: ( val: boolean ) => void
}

export
function FixedToggle
({ checked, onChange }: PFixedToggle )
{
    const handleChange = useCallback(
        ( val: boolean ) => {
            onChange( !val )
        },
        [ onChange ]
    )

    return (
        <Checkbox checked={!checked} className={styles.container} onChange={handleChange}>
            Hide by timeout
        </Checkbox>
    )
}
