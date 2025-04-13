import cn from 'classnames'

import { ImageHideOnError } from 'src/@/segments/units/ImageHideOnError'
import { ListButton }       from 'src/@/segments/units/ListButton'

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
({ icon, fallback, width, height, onError, className, ...rest }: PIconButton )
{
    const { src, size, loading, error, loaded } = useIconButton( icon, fallback, onError )

    return (
        <ListButton {...rest} className={cn( className, loading && styles.loading )}>
            <ImageHideOnError
                className={styles.icon}
                draggable={false}
                height={height ?? size}
                src={src}
                width={width ?? size}
                onError={error}
                onLoad={loaded}
            />
        </ListButton>
    )
}
