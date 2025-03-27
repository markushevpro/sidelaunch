import { useCallback } from 'react'

import { useCurrentFolder } from 'src/@/services/folder/hook'
import { useHookResult }    from 'src/@/shared/hooks/useHookResult'

import type { FolderItem } from 'src/@/shared/types/items'

interface HFolderListItem
{
    click: () => void
}

export
function useFolderListItem
( data: FolderItem ): HFolderListItem
{
    const { set } = useCurrentFolder()

    const go = useCallback(
        () => {
            set( data )
        },
        [ data, set ]
    )

    return useHookResult({ click: go })
}
