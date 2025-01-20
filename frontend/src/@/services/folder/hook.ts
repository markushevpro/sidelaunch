import { useCallback, useEffect, useMemo } from 'react'
import { useLibrary }                      from 'src/@/services/library/hook'

import type { FolderItem, ListItem } from 'src/@/shared/types/items'

import { asFolder, sortHandler } from './helpers'
import { useFolderStore }        from './store'

interface HCurrentFolder
{
    folder: FolderItem | undefined
    items: ListItem[]
}

export
function useCurrentFolder
(): HCurrentFolder
{
    const { library } = useLibrary()

    const { folder, items, update } = useFolderStore()

    const setTopFolder = useCallback(
        () => {
            if ( library ) {
                const top = asFolder( library, 'top' )

                update({
                    folder: top,
                    items:  top.children.sort( sortHandler )
                })
            }
        },
        [ library, update ]
    )

    useEffect(
        () => {
            if ( !folder ) {
                setTopFolder()
            }
        },
        [ folder, setTopFolder ]
    )

    return useMemo(
        () => ({
            folder,
            items: items ?? []
        }),
        [ folder, items ]
    )
}
