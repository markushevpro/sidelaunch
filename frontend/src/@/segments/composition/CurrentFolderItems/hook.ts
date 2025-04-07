import cn          from 'classnames'
import { useMemo } from 'react'

import { useCurrentFolder } from 'src/@/services/folder/hook'
import { useKeyboardStore } from 'src/@/services/keyboard/store'
import { useHookResult }    from 'src/@/shared/hooks/useHookResult'

import type { ListItem } from 'src/@/shared/types/items'

import styles from './current-folder-items.module.css'

interface HCurrentFolderItems
{
    classNames: string
    items: ListItem[]
}

export
function useCurrentFolderItems
(): HCurrentFolderItems
{
    const { ctrl }  = useKeyboardStore()
    const { items } = useCurrentFolder()

    const classNames = useMemo(
        () => cn( styles.list, ctrl && 'with-control' ),
        [ ctrl ]
    )

    return useHookResult({
        classNames,
        items
    })
}
