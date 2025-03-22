import cn from 'classnames'

import type { PropsWithChildren } from 'react'
import type { DivProps }          from 'src/@/shared/types/props'

import styles from './stack.module.css'

interface PStack
    extends
    PropsWithChildren,
    DivProps
{
    align?: 'start' | 'end' | 'center'
    gap?: number
}

export
function Stack
({ gap, align, children, className, style }: PStack )
{
    return (
        <div
            className={cn( className, styles.stack, align && styles[ `align-${align}` ])}
            style={{
                ...style,
                gap: `${gap}px`
            }}
        >
            { children }
        </div>
    )
}
