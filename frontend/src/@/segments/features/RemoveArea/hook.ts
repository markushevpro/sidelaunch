import { useCallback, useMemo } from 'react'
import { useDnDStore }          from 'src/@/services/dnd/store'
import { useCurrentFolder }     from 'src/@/services/folder/hook'
import { useHookResult }        from 'src/@/shared/hooks/useHookResult'

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
    const { remove }       = useCurrentFolder()

    const visible = useMemo(() => !!dragged, [ dragged ])

    const drop = useCallback(
        async ( income: ListItem ) => {
            await remove( income )
            end()
        },
        [ end, remove ]
    )

    return useHookResult({
        visible,
        drop
    })
}
