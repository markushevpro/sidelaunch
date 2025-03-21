import cn from 'classnames'

import type { PropsWithChildren } from 'react'
import type { DivProps }          from 'src/@/shared/types/props'

import styles from './stack.module.css'

interface PStack
    extends
    PropsWithChildren,
    DivProps
{}

export
function Stack
({ children, className, style }: PStack )
{
    return (
        <div className={cn( className, styles.stack )} style={style}>
            { children }
        </div>
    )
}
