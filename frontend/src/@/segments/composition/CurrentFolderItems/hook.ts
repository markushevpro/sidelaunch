import cn                       from 'classnames'
import { useCallback, useMemo } from 'react'
import { useCurrentFolder }     from 'src/@/services/folder/hook'
import { useIconsStore }        from 'src/@/services/icon/store'
import { useKeyboardStore }     from 'src/@/services/keyboard/store'
import { useLibrary }           from 'src/@/services/library/hook'
import { useHookResult }        from 'src/@/shared/hooks/useHookResult'

import type { ListItem } from 'src/@/shared/types/items'

import styles from './current-folder-items.module.css'

interface HCurrentFolderItems
{
    classNames: string
    items: ListItem[]
    checkUpdate: () => void
}

export
function useCurrentFolderItems
(): HCurrentFolderItems
{
    const { load }       = useLibrary()
    const { revalidate } = useIconsStore()
    const { ctrl }       = useKeyboardStore()

    const { items, waitingUpdate, waitOut, stopWaitingUpdate, refresh } = useCurrentFolder()

    const classNames = useMemo(
        () => cn( styles.list, ctrl && 'with-control' ),
        [ ctrl ]
    )

    const reload = useCallback(
        async () => {
            revalidate()
            refresh( await load())
        },
        [ load, refresh, revalidate ]
    )

    const checkUpdate = useCallback(
        () => {
            if ( waitingUpdate && !waitOut ) {
                void reload()
                stopWaitingUpdate()
            }
        },
        [ waitingUpdate, waitOut, reload, stopWaitingUpdate ]
    )

    return useHookResult({
        classNames,
        items,
        checkUpdate
    })
}
