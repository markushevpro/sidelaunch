import { useMemo }       from 'react'
import { useHookResult } from 'src/@/shared/hooks/useHookResult'

import type { FolderItem, ListItem } from 'src/@/shared/types/items'

interface HFolderItems
{
    visible: ListItem[]
    more: number
}

export
function useFolderItems
( folder: FolderItem, max?: number ): HFolderItems
{
    const more = useMemo(
        () => max ? folder.children.length - max : 0,
        [ folder, max ]
    )

    const visible = useMemo(
        () => {
            if ( more > 0 ) {
                return folder.children.slice( 0, max )
            }

            return folder.children
        },
        [ more, max, folder ]
    )

    return useHookResult({
        visible,
        more
    })
}
