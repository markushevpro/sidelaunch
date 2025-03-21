import cn from 'classnames'

import type { PropsWithChildren } from 'react'
import type { DivProps }          from 'src/@/shared/types/props'

import styles from './fill.module.css'

interface PFill
    extends
    PropsWithChildren,
    DivProps
{}

export
function Fill
({ children, className, style }: PFill )
{
    return (
        <div className={cn( className, styles.fill )} style={style}>
            { children }
        </div>
    )
}
