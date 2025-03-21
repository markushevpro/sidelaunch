import cn from 'classnames'

import type { ButtonProps } from 'src/@/shared/types/props'

import styles from './button.module.css'

export
function Button
({ className, children, ...rest }: ButtonProps )
{
    return (
        <button
            { ...rest }
            className={cn( className, styles.button )}
        >
            { children }
        </button>
    )
}
