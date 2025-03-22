import { Button }   from 'src/@/shared/ui-kit/Button'
import { Center }   from 'src/@/shared/ui-kit/Center'
import { Content }  from 'src/@/shared/ui-kit/Content'
import { HDivider } from 'src/@/shared/ui-kit/HDivider'
import { Stack }    from 'src/@/shared/ui-kit/Stack'

import type { ComponentProps, PropsWithChildren } from 'react'

import styles from './dialog.module.css'

interface PDialog
extends
PropsWithChildren
{
    buttons: ComponentProps<typeof Button>[]
}

export
function Dialog
({ buttons, children }: PDialog )
{
    return (
        <Content fill className={styles.wrapper}>
            <div className={styles.content}>
                <Center>
                    { children }
                </Center>
            </div>

            <HDivider />

            <footer>
                <Stack gap={16}>
                    {
                    buttons.map(( btn, index ) => (
                        <Button key={index} {...btn} />
                    ))
                }
                </Stack>
            </footer>
        </Content>
    )
}
