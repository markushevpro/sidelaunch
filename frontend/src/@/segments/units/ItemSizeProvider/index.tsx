import { TARGET_WINDOW_SIZE } from 'src/@/services/window/const'

import type { CSSProperties, PropsWithChildren } from 'react'

import styles from './item-size-provider.module.css'

export
function ItemSizeProvider
({ children }: PropsWithChildren )
{
    return (
        <div
            className={styles.container}
            style={{ '--item-size': TARGET_WINDOW_SIZE + 'px' } as CSSProperties}
        >
            { children }
        </div>
    )
}
