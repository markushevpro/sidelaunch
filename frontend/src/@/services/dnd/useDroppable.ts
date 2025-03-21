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
( data: ListItem, onDrop: ( income: ListItem, base?: ListItem ) => void | Promise<void>, onHover?: ( income: ListItem, base?: ListItem ) => void ): HDroppable
{
    const ref = useRef<HTMLDivElement>( null )

    const [ { handlerId }, drop ] = useDrop<ListItem, undefined, { handlerId: Identifier | null }>({
        accept: 'item',
        collect ( monitor ) {
            return { handlerId: monitor.getHandlerId() }
        },
        drop ( target: ListItem ) {
            void onDrop( target, data )
            return undefined
        },
        hover ( target: ListItem ) {
            if ( !ref.current ) {
                return
            }

            onHover?.( target, data )
        }
    })

    drop( ref )

    return useHookResult({
        ref,
        id: handlerId
    })
}
