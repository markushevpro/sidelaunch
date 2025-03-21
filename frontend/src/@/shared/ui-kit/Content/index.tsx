import cn from 'classnames'

import type { PropsWithChildren } from 'react'
import type { DivProps }          from 'src/@/shared/types/props'

import styles from './content.module.css'

interface PContent
extends
PropsWithChildren,
DivProps
{
    fill?: boolean
}

export
function Content
({ fill, children, className, ...rest }: PContent )
{
    return (
        <div {...rest} className={cn( className, styles.content, fill && styles.fill )}>
            { children }
        </div>
    )
}
