import cn from 'classnames'

import type { ButtonProps } from 'src/@/shared/types/props'

import styles from './small-button.module.css'

export
function SmallButton
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
