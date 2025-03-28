import { ListButton } from 'src/@/segments/units/ListButton'

import type { ButtonProps } from 'src/@/shared/types/props'

import { useIconButton } from './hook'
import styles            from './icon-button.module.css'

interface PIconButton
extends
ButtonProps
{
    icon: string
    fallback?: string
    width?: number
    height?: number
    onError?: () => void
}

export
function IconButton
({ icon, fallback, width, height, onError, ...rest }: PIconButton )
{
    const { src, size, error } = useIconButton( icon, fallback, onError )

    return (
        <ListButton {...rest}>
            <img
                className={styles.icon}
                draggable={false}
                height={height ?? size}
                src={src}
                width={width ?? size}
                onError={error}
            />
        </ListButton>
    )
}
