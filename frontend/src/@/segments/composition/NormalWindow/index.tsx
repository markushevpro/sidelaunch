import { useCallback }        from 'react'
import { useAppView }         from 'src/@/services/view/hook'
import { TARGET_WINDOW_SIZE } from 'src/@/services/window/const'
import { useWindow }          from 'src/@/services/window/hook'
import { SmallButton }        from 'src/@/shared/ui-kit/SmallButton'
import { WindowSetSize }      from 'wailsjs/runtime/runtime'

import type { PropsWithChildren } from 'react'

import styles from './normal-window.module.css'

interface PNormalWindow
extends
PropsWithChildren
{
    title: string
}

export
function NormalWindow
({ title, children }: PNormalWindow )
{
    const view = useAppView()
    const w    = useWindow()

    const close = useCallback(
        () => {
            void WindowSetSize( TARGET_WINDOW_SIZE, screen.availHeight )
            view.update({ view: 'list' })
            w.reset()
            window.location.reload()
        },
        [ view, w ]
    )

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>
                    { title }
                </h1>

                <aside className={styles.controls}>
                    <SmallButton className={styles.close} onClick={close}>
                        ×
                    </SmallButton>
                </aside>
            </header>

            <section className={styles.content}>
                { children }
            </section>
        </div>
    )
}
