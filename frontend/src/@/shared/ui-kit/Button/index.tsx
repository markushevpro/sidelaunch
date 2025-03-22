import cn from 'classnames'

import type { ButtonProps } from 'src/@/shared/types/props'

import styles from './button.module.css'

interface PButton
extends
ButtonProps
{
    alert?: boolean
    ghost?: boolean
}

export
function Button
({ alert, ghost, className, children, ...rest }: PButton )
{
    return (
        <button
            { ...rest }
            className={cn( className, styles.button, alert && styles.alert, ghost && styles.ghost )}
        >
            { children }
        </button>
    )
}
