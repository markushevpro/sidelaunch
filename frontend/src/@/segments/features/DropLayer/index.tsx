import cn from 'classnames'

import type { PropsWithChildren } from 'react'

import styles           from './drop-layer.module.css'
import { useDropLayer } from './hook'

export
function DropLayer
({ children }: PropsWithChildren )
{
    const { dropClassName, ref } = useDropLayer()

    return (
        <div
            ref={ref}
            className={cn(
                styles.dropLayer,
                dropClassName
            )}
        >
            { children }
        </div>
    )
}
