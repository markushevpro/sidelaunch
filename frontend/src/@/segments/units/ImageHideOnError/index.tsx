import cn from 'classnames'

import type { ImageProps } from 'src/@/shared/types/props'

import { useImageHideOnError } from './hook'
import styles                  from './image-hide-on-error.module.css'

type PImageHideOnError = ImageProps

export
function ImageHideOnError
({ src, className, ...rest }: PImageHideOnError )
{
    const { visible, onError, onLoad } = useImageHideOnError( src )

    return (
        <img
            {...rest}
            className={cn( className, styles.base, visible && styles.visible )}
            src={src}
            onError={onError}
            onLoad={onLoad}
        />
    )
}
