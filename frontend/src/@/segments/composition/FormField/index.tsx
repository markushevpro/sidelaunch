import cn from 'classnames'

import type { PropsWithChildren, ReactNode } from 'react'

import styles from './form-field.module.css'

interface PFormField
extends
PropsWithChildren
{
    className?: string
    hidden?: boolean
    label?: ReactNode
}

export
function FormField
({ hidden, label, className, children }: PFormField )
{
    if ( hidden ) {
        return null
    }

    return (
        <div className={cn( styles.container, className )}>
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
