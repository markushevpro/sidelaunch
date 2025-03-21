import { useCallback }   from 'react'
import { useHookResult } from 'src/@/shared/hooks/useHookResult'
import { EditItem }      from 'wailsjs/go/main/App'

import type { AppViewStore } from './store'
import type { ListItem }     from 'src/@/shared/types/items'

import { useAppViewStore } from './store'

interface HAppView
extends
AppViewStore
{
    editMode: ( item: ListItem ) => void
}

export
function useAppView
(): HAppView
{
    const { update, ...store } = useAppViewStore()

    const editMode = useCallback(
        async ( item: ListItem ) => {
            await EditItem( item.id )
        },
        []
    )

    return useHookResult({
        ...store,
        update,
        editMode
    })
}
