import cn                        from 'classnames'
import { useCallback, useState } from 'react'
import { useIconsStore }         from 'src/@/services/icon/store'

import type { ImageProps } from 'src/@/shared/types/props'

import styles from './image-hide-on-error.module.css'

type PImageHideOnError = ImageProps

export
function ImageHideOnError
({ src, className, ...rest }: PImageHideOnError )
{
    const { error } = useIconsStore()

    const [ visible, $visible ] = useState<boolean>( !!( src && !error.includes( src )))

    const onError = useCallback(
        () => {
            $visible( false )
        },
        []
    )

    return (
        <img
            {...rest}
            className={cn( className, styles.base, visible && styles.visible )}
            src={src}
            onError={onError}
        />
    )
}
