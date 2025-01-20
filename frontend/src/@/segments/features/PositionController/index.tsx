import { useWindow } from 'src/@/services/window/hook'

import type { PropsWithChildren } from 'react'

import styles from './position-controller.module.css'

type PPositionController = PropsWithChildren

export
function PositionController
({ children }: PPositionController )
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
