import cn from 'classnames'

import type { PropsWithChildren } from 'react'
import type { DivProps }          from 'src/@/shared/types/props'

import styles from './badge.module.css'

interface PBadge
extends
PropsWithChildren,
DivProps
{}

export
function Badge
({ className, children }: PBadge )
{
    return (
        <div className={cn( styles.badge, className )}>
            { children }
        </div>
    )
}
