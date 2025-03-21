import cn             from 'classnames'
import { IconButton } from 'src/@/segments/units/IconButton'

import type { ComponentProps, ReactNode } from 'react'

import styles from './icon-width-badge.module.css'

interface PIconWithBadge
extends
ComponentProps<typeof IconButton>
{
    badge?: ReactNode
    center?: boolean
}

export
function IconWithBadge
({ badge, center, ...rest }: PIconWithBadge )
{
    return (
        <div className={styles.container}>
            <IconButton {...rest} />

            <div className={cn( styles.badge, center && styles.center )}>
                { badge }
            </div>
        </div>
    )
}
