import { useCallback, useMemo } from 'react'

import { useLibrary }    from 'src/@/services/library/hook'
import { useAppView }    from 'src/@/services/view/hook'
import { useHookResult } from 'src/@/shared/hooks/useHookResult'

import type { FolderItem } from 'src/@/shared/types/items'

interface HRemoveFolderButtons
{
    remove: () => void
    saveChildren: () => void
    cancel: () => void
}

export
function useRemoveFolderButtons
(): HRemoveFolderButtons
{
    const { item }                     = useAppView()
    const { removeFolderSave, remove } = useLibrary()

    const folder = useMemo(
        () => item as FolderItem,
        [ item ]
    )

    const cancel = useCallback(
        () => {
            window.runtime.Quit()
        },
        []
    )

    const saveChildren = useCallback(
        async () => {
            if ( folder.parent ) {
                await removeFolderSave( folder )
            }

            window.runtime.Quit()
        },
        [ folder, removeFolderSave ]
    )

    const removeWithChildren = useCallback(
        async () => {
            await remove( folder )
            window.runtime.Quit()
        },
        [ folder, remove ]
    )

    return useHookResult({
        cancel,
        saveChildren,
        remove: removeWithChildren
    })
}
