import { useMemo, useCallback } from 'react'
import { useDnDStore }          from 'src/@/services/dnd/store'
import { useHookResult }        from 'src/@/shared/hooks/useHookResult'

import type { ListItem } from 'src/@/shared/types/items'

interface HDraggableListItem
{
    dragging: boolean
    onStart: () => void
    onEnd: () => void
}

export
function useDraggableListItem
( data: ListItem ): HDraggableListItem
{
    const { dragged, start, end } = useDnDStore()

    const dragging = useMemo(
        () => dragged === data.id,
        [ data.id, dragged ]
    )

    const onStart = useCallback(
        () => {
            start( data )
        },
        [ data, start ]
    )

    const onEnd = useCallback(
        () => {
            end()
        },
        [ end ]
    )

    return useHookResult({
        dragging,
        onStart,
        onEnd
    })
}
