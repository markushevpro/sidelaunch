import { useMemo } from 'react'

import { FolderIcon }    from 'src/@/segments/units/FolderIcon'
import { useIcon }       from 'src/@/services/icon/hook'
import { useAppView }    from 'src/@/services/view/hook'
import { useHookResult } from 'src/@/shared/hooks/useHookResult'
import { isFolder }      from 'src/@/shared/utils/items'

import type { ReactNode }  from 'react'
import type { FolderItem } from 'src/@/shared/types/items'

interface HIconEditor
{
    id: string
    icon: string
    folder: ReactNode | undefined
    force: () => void
}

export
function useIconEditor
(): HIconEditor
{
    const { item }        = useAppView()
    const { icon, force } = useIcon( item )

    const folder = useMemo(
        () => !!( item && isFolder( item )),
        [ item ]
    )

    return useHookResult({
        icon,
        id:     item?.id ?? '',
        folder: (
            folder
                ? <FolderIcon data={item as FolderItem} size={64} />
                : undefined
        ),
        force
    })
}
