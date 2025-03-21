import type { PropsWithChildren } from 'react'

import styles from './form-field.module.css'

interface PFormField
extends
PropsWithChildren
{
    label?: string
}

export
function FormField
({ label, children }: PFormField )
{
    return (
        <div className={styles.container}>
            <label className={styles.group}>
                <span className={styles.label}>
                    { label }
                </span>

                { children }
            </label>
        </div>
    )
}
