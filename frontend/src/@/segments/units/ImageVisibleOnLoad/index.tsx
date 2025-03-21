import cn                        from 'classnames'
import { useCallback, useState } from 'react'

import type { ImageProps } from 'src/@/shared/types/props'

import styles from './image-visible-on-load.module.css'

type PImageVisibleOnLoad = ImageProps

export
function ImageVisibleOnLoad
({ src, className, ...rest }: PImageVisibleOnLoad )
{
    const [ visible, $visible ] = useState<boolean>( false )

    const onLoad = useCallback(
        () => {
            $visible( true )
        },
        []
    )

    return (
        <img
            {...rest}
            className={cn( className, styles.base, visible && styles.visible )}
            src={src}
            onLoad={onLoad}
        />
    )
}
