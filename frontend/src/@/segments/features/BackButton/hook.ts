import { useMemo, useCallback } from 'react'
import { useCurrentFolder }     from 'src/@/services/folder/hook'
import { useLibrary }           from 'src/@/services/library/hook'
import { useHookResult }        from 'src/@/shared/hooks/useHookResult'

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
    const { move }   = useLibrary()
    const { folder } = useCurrentFolder()

    const goUp = useCallback(
        () => {
            console.log( 'go to parent folder' )
        },
        []
    )

    const onDrop = useMemo(() => move( folder?.id, folder?.parent ), [ folder, move ])

    const visible = useMemo(() => !!folder?.parent, [ folder?.parent ])

    return useHookResult({
        visible,
        onDrop,
        onClick: goUp
    })
}
