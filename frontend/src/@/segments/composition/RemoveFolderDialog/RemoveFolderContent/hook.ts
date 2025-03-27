import { useMemo } from 'react'

import { useAppView }    from 'src/@/services/view/hook'
import { useHookResult } from 'src/@/shared/hooks/useHookResult'

import type { FolderItem } from 'src/@/shared/types/items'

interface HRemoveFolderContent
{
    name: string
    info: string
    folder: FolderItem
}

export
function useRemoveFolderContent
(): HRemoveFolderContent
{
    const { item } = useAppView()

    const folder = useMemo(
        () => item as FolderItem,
        [ item ]
    )

    const count = useMemo(
        () => folder.children.length,
        [ folder ]
    )

    const info = useMemo(
        () => `${count} ${count.toString().endsWith( '1' ) ? 'child' : 'children'}`,
        [ count ]
    )

    const name = useMemo(
        () => folder?.name ? `"${folder.name}"` : '',
        [ folder?.name ]
    )

    return useHookResult({
        folder,
        info,
        name
    })
}
