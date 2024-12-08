import { useWindow } from 'src/app/services/window/hooks/useWindow'

import type { PropsWithChildren, ReactNode } from 'react'

import styles from './move-layer.module.css'

type PMoveLayer = PropsWithChildren

export
function MoveLayer
({ children }: PMoveLayer ): ReactNode
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
