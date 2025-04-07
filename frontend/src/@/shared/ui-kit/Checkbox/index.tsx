import cn              from 'classnames'
import { useCallback } from 'react'

import type { ChangeEvent, PropsWithChildren } from 'react'

import styles from './checkbox.module.css'

interface PCheckbox
extends
PropsWithChildren
{
    className?: string
    checked: boolean
    onChange: ( val: boolean ) => void
}

export
function Checkbox
({ className, checked, children, onChange }: PCheckbox )
{
    const handleChange = useCallback(
        ( e: ChangeEvent<HTMLInputElement> ) => {
            onChange( e.target.checked )
        },
        [ onChange ]
    )

    return (
        <label className={cn( styles.container, className )}>
            <input checked={checked} type="checkbox" onChange={handleChange} />

            <span className={styles.label}>
                { children }
            </span>
        </label>
    )
}
