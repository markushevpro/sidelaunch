import { useEffect }       from 'react'
import { useLibrary }      from 'src/@/services/library/hook'
import { useAppView }      from 'src/@/services/view/hook'
import { useNormalWindow } from 'src/@/services/window/useNormalWindow'
import { useHookResult }   from 'src/@/shared/hooks/useHookResult'
import { usePageData }     from 'src/@/shared/utils/routes'

import type { ListItem } from 'src/@/shared/types/items'

interface HRemoveFolderWindow
{
    item: ListItem | undefined
}

export
function useRemoveFolderWindow
(): HRemoveFolderWindow
{
    const { id }           = usePageData()
    const { find }         = useLibrary()
    const { item, update } = useAppView()

    useNormalWindow()

    useEffect(
        () => {
            if ( !item && id ) {
                update({
                    view: 'edit',
                    item: find( id )
                })
            }
        },
        [ find, id, item, update ]
    )

    useEffect(
        () => {
            if ( item?.name ) {
                document.title = `Remove ${item.name}`
            }
        },
        [ item?.name ]
    )

    return useHookResult({ item })
}
