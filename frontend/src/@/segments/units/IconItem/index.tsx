import cn                                                                               from 'classnames'
import { useMemo, type DetailedHTMLProps, type HTMLAttributes, type PropsWithChildren } from 'react'
import { useConfig }                                                                    from 'src/@/services/config/hook'

import styles from './icon-item.module.css'

interface PIconItem
extends
PropsWithChildren,
DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
{}

export
function IconItem
({ children, className, style, ...rest }: PIconItem )
{
    const { config } = useConfig()
    const size       = useMemo(() => ( config?.iconSize ?? 32 ) + 16, [ config?.iconSize ])

    return (
        <div
            {...rest}
            className={cn( className, styles.item )}
            style={{
                ...style,
                width:  size,
                height: size
            }}
        >
            { children }
        </div>
    )
}
