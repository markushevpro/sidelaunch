import type { PropsWithChildren } from 'react'

import styles from './form-field.module.css'

interface PFormField
extends
PropsWithChildren
{
    hidden?: boolean
    label?: string
}

export
function FormField
({ hidden, label, children }: PFormField )
{
    if ( hidden ) {
        return null
    }

    return (
        <div className={styles.container}>
            <label className={styles.group}>
                <span className={styles.label}>
                    { label }
                </span>

                <section className={styles.row}>
                    { children }
                </section>
            </label>
        </div>
    )
}
