import cn                       from 'classnames'
import { useCallback, useMemo } from 'react'
import { useDnDStore }          from 'src/@/services/dnd/store'
import { useCurrentFolder }     from 'src/@/services/folder/hook'
import { useKeyboardStore }     from 'src/@/services/keyboard/store'
import { useHookResult }        from 'src/@/shared/hooks/useHookResult'
import { isFolder }             from 'src/@/shared/utils/items'

import type { ListItem } from 'src/@/shared/types/items'

import styles from './droppable-list-item.module.css'

interface HDroppableListItem
{
    classNames: string
    onDrop: ( income: ListItem ) => Promise<void>
    onHover: () => void
}

export
function useDroppableListItem
( data: ListItem ): HDroppableListItem
{
    const { dragged, hovered, end, hover } = useDnDStore()
    const { ctrl }                         = useKeyboardStore()
    const { move, resort }                 = useCurrentFolder()

    const classNames = useMemo(
        () => cn(
            styles.item,
            isFolder( data ) && styles.folder,
            dragged === data.id && styles.dragged,
            hovered === data.id && styles.hover
        ),
        [ data, dragged, hovered ]
    )

    const onDrop = useCallback(
        async ( income: ListItem ) => {
            if ( isFolder( data )) {
                if ( ctrl ) {
                    await resort( income, data )
                } else if ( data.id !== income.id ) {
                    await move( income, data.id )
                }
                end()
            } else {
                await resort( income, data )
            }
        },
        [ data, ctrl, end, move, resort ]
    )

    const onHover = useCallback(
        () => {
            hover( data )
        },
        [ data, hover ]
    )

    return useHookResult({
        classNames,
        onDrop,
        onHover
    })
}
