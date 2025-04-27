import cn from 'classnames'

import { IconButton }     from 'src/@/segments/units/IconButton'
import { LoadingOverlay } from 'src/@/shared/ui-kit/LoadingOverlay'
import { Visible }        from 'src/@/shared/ui-kit/Visible'

import type { ComponentProps, ReactNode } from 'react'

import styles from './icon-width-badge.module.css'

interface PIconWithBadge
extends
ComponentProps<typeof IconButton>
{
    loading?: boolean
    badge?: ReactNode
    center?: boolean
}

export
function IconWithBadge
({ loading, badge, center, ...rest }: PIconWithBadge )
{
    return (
        <div className={styles.container}>
            <IconButton {...rest} />

            <div className={cn( styles.badge, center && styles.center )}>
                { badge }
            </div>

            <Visible If={loading}>
                <LoadingOverlay />
            </Visible>
        </div>
    )
}
