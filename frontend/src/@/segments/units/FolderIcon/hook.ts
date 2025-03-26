import { useMemo }          from 'react'
import { useConfig }        from 'src/@/services/config/hook'
import { useCurrentFolder } from 'src/@/services/folder/hook'
import { useIcon }          from 'src/@/services/icon/hook'
import { useHookResult }    from 'src/@/shared/hooks/useHookResult'

import type { FolderItem } from 'src/@/shared/types/items'

interface HFolderIcon
{
    icon: ReturnType<typeof useIcon> & { fallback: string }
    size: number
    loading: boolean
}

export
function useFolderIcon
( data: FolderItem, customSize?: number ): HFolderIcon
{
    const rawIcon       = useIcon( data )
    const { config }    = useConfig()
    const { isWaiting } = useCurrentFolder()

    const size = useMemo(
        () => ( customSize ?? config.iconSize ?? 32 ) * 1.2,
        [ config.iconSize, customSize ]
    )

    const icon = useMemo(
        () => ({
            ...rawIcon,
            fallback: rawIcon.fallback ?? '/assets/folder.png'
        }),
        [ rawIcon ]
    )

    return useHookResult({
        icon,
        size,
        loading: isWaiting( data )
    })
}
