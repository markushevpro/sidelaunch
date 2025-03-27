import { useCallback, useEffect, useMemo, useState } from 'react'

import { useDnDStore }      from 'src/@/services/dnd/store'
import { useCurrentFolder } from 'src/@/services/folder/hook'
import { useHookResult }    from 'src/@/shared/hooks/useHookResult'

import type { ListItem } from 'src/@/shared/types/items'

interface HBackButton
{
    visible: boolean
    hovered: boolean
    onHover: () => void,
    onDrop: ( item: ListItem ) => void
    onClick: () => void
}

export
function useBackButton
(): HBackButton
{
    const { hovered, hover }       = useDnDStore()
    const { folder, goUp, moveUp } = useCurrentFolder()

    const [ dragover, $dragover ] = useState<boolean>( false )

    const visible = useMemo(
        () => !!folder?.parent,
        [ folder?.parent ]
    )

    const onHover = useCallback(
        () => {
            hover( undefined )
            $dragover( true )
        },
        [ hover ]
    )

    useEffect(
        () => {
            if ( hovered ) {
                $dragover( false )
            }
        },
        [ hovered ]
    )

    return useHookResult({
        visible,
        hovered: dragover,
        onHover,
        onDrop:  moveUp,
        onClick: goUp
    })
}
