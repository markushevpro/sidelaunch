import cn from 'classnames'

import type { PropsWithChildren } from 'react'
import type { DivProps }          from 'src/@/shared/types/props'

import styles from './center.module.css'

interface PCenter
    extends
    PropsWithChildren,
    DivProps
{}

export
function Center
({ children, className, ...rest }: PCenter )
{
    return (
        <div className={cn( styles.center, className )} {...rest}>
            { children }
        </div>
    )
}
