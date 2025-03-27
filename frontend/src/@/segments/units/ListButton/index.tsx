import cn from 'classnames'

import { TARGET_WINDOW_SIZE } from 'src/@/services/window/const'

import type {  PropsWithChildren } from 'react'
import type { ButtonProps }        from 'src/@/shared/types/props'

import styles from './list-button.module.css'

interface PListButton
extends
PropsWithChildren,
ButtonProps
{}

export
function ListButton
({ children, className, style, onClick, ...rest }: PListButton )
{
    return (
        <button
            {...rest}
            className={cn( className, styles.item, onClick && styles.clickable )}
            style={{
                width:  TARGET_WINDOW_SIZE,
                height: TARGET_WINDOW_SIZE,
                ...style
            }}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={onClick}
        >
            { children }
        </button>
    )
}
