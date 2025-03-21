import cn                   from 'classnames'
import { useCallback }      from 'react'
import { SmartItem }        from 'src/@/segments/features/SmartItem'
import { ItemSizeProvider } from 'src/@/segments/units/ItemSizeProvider'
import { useCurrentFolder } from 'src/@/services/folder/hook'
import { useKeyboardStore } from 'src/@/services/keyboard/store'
import { useLibrary }       from 'src/@/services/library/hook'

import styles from './current-folder-items.module.css'

export
function CurrentFolderItems
()
{
    const { load } = useLibrary()
    const { ctrl } = useKeyboardStore()

    const { items, isWaitingUpdate, stopWaitingUpdate, refresh } = useCurrentFolder()

    const reload = useCallback(
        async () => {
            refresh( await load())
        },
        [ load, refresh ]
    )

    const checkUpdate = useCallback(
        () => {
            if ( isWaitingUpdate ) {
                void reload()
                stopWaitingUpdate()
            }
        },
        [ isWaitingUpdate, reload, stopWaitingUpdate ]
    )

    return (
        <ItemSizeProvider>
            <ul className={cn( styles.list, ctrl && 'with-control' )} onMouseMove={checkUpdate}>
                {
                    items.map( item => (
                        <SmartItem key={item.id} data={item} />
                    ))
                }

                {/* <LastPlace /> */}
            </ul>
        </ItemSizeProvider>
    )
}
