import { useRef }        from 'react'
import { useDrop }       from 'react-dnd'
import { useHookResult } from 'src/@/shared/hooks/useHookResult'

import type { Identifier } from 'dnd-core'
import type { RefObject }  from 'react'
import type { ListItem }   from 'src/@/shared/types/items'

interface HDroppable
{
    ref: RefObject<HTMLDivElement>
    id: Identifier | null
}

export
function useDroppable
( data: ListItem, onDrop: ( from: ListItem, to: ListItem ) => void, onHover?: ( current: ListItem, hover: ListItem ) => void ): HDroppable
{
    const ref = useRef<HTMLDivElement>( null )

    const [ { handlerId }, drop ] = useDrop<ListItem, undefined, { handlerId: Identifier | null }>({
        accept: 'item',
        collect ( monitor ) {
            return { handlerId: monitor.getHandlerId() }
        },
        drop ( item: ListItem ) {
            onDrop( item, data )
            return undefined
        },
        hover ( item: ListItem ) {
            if ( !ref.current ) {
                return
            }

            onHover?.( item, data )
        }
    })

    drop( ref )

    return useHookResult({
        ref,
        id: handlerId
    })
}
