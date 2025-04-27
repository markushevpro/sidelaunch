import { Center }   from 'src/@/shared/ui-kit/Center'
import { Content }  from 'src/@/shared/ui-kit/Content'
import { HDivider } from 'src/@/shared/ui-kit/HDivider'
import { Visible }  from 'src/@/shared/ui-kit/Visible'

import type { PropsWithChildren, ReactNode } from 'react'

import styles from './dialog.module.css'

interface PDialog
extends
PropsWithChildren
{
    footer?: ReactNode
}

export
function Dialog
({ footer, children }: PDialog )
{
    return (
        <Content fill className={styles.wrapper}>
            <div className={styles.content}>
                <Center>
                    { children }
                </Center>
            </div>

            <Visible If={footer}>
                <HDivider />

                <footer>
                    { footer }
                </footer>
            </Visible>
        </Content>
    )
}
