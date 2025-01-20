import { useWindow } from 'src/@/services/window/useWindow'

import type { PropsWithChildren } from 'react'

import styles from './move-layer.module.css'

type PVisibilityHandler = PropsWithChildren

export
function VisibilityHandler
({ children }: PVisibilityHandler )
{
    const { offset, hide, show } = useWindow()

    return (
        <main
            className={styles.container}
            style={{ paddingLeft: -offset }}
            onDragLeave = {hide}
            onDragOver = {show}
            onMouseEnter = {show}
            onMouseLeave = {hide}
        >
            { children }
        </main>
    )
}
