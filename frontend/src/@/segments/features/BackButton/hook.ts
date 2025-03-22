import { useMemo }          from 'react'
import { useCurrentFolder } from 'src/@/services/folder/hook'
import { useHookResult }    from 'src/@/shared/hooks/useHookResult'

import type { ListItem } from 'src/@/shared/types/items'

interface HBackButton
{
    visible: boolean
    onDrop: ( item: ListItem ) => void
    onClick: () => void
}

export
function useBackButton
(): HBackButton
{
    const { folder, goUp, moveUp } = useCurrentFolder()

    const visible = useMemo(
        () => !!folder?.parent,
        [ folder?.parent ]
    )

    return useHookResult({
        visible,
        onDrop:  moveUp,
        onClick: goUp
    })
}
