import { useCallback, useMemo } from 'react'
import { useDnDStore }          from 'src/@/services/dnd/store'
import { useCurrentFolder }     from 'src/@/services/folder/hook'
import { useHookResult }        from 'src/@/shared/hooks/useHookResult'
import { isFolder }             from 'src/@/shared/utils/items'
import { ConfirmFolderRemove }  from 'wailsjs/go/main/App'

import type { ListItem } from 'src/@/shared/types/items'

interface HRemoveArea
{
    visible: boolean
    drop: ( income: ListItem ) => void
}

export
function useRemoveArea
(): HRemoveArea
{
    const { dragged, end } = useDnDStore()
    const { waitUpdate }   = useCurrentFolder()
    const { remove }       = useCurrentFolder()

    const visible = useMemo(
        () => !!dragged,
        [ dragged ]
    )

    const drop = useCallback(
        async ( income: ListItem ) => {
            if ( isFolder( income )) {
                if ( income.children.length > 0 ) {
                    await ConfirmFolderRemove( income.id )
                    setTimeout(() => { waitUpdate( income.id ) }, 1000 )
                } else {
                    await remove( income )
                }
            } else {
                await remove( income )
            }

            end()
        },
        [ end, remove, waitUpdate ]
    )

    return useHookResult({
        visible,
        drop
    })
}
