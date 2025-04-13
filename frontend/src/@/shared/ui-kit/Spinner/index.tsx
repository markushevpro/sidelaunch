import cn from 'classnames'

import type { DivProps } from 'src/@/shared/types/props'

import styles from './spinner.module.css'

export
function Spinner
({ className, ...rest }: DivProps )
{
    return (
        <span className={cn( styles.spinner, className )} {...rest} />
    )
}
