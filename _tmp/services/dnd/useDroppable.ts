import { useRef }        from 'react'
import { useDrop }       from 'react-dnd'
import { useHookResult } from 'src/@/shared/hooks/useHookResult'

import type { Identifier } from 'dnd-core'
import type { RefObject }  from 'react'
import type { IItem }      from 'src/@/shared/types/items'

interface HDroppable
{
    ref: RefObject<HTMLDivElement>
    id: Identifier | null
}

export
function useDroppable
( data: IItem, onDrop: ( from: IItem, to: IItem ) => void, onHover?: ( current: IItem, hover: IItem ) => void ): HDroppable
{
    const ref = useRef<HTMLDivElement>( null )

    const [ { handlerId }, drop ] = useDrop<IItem, undefined, { handlerId: Identifier | null }>({
        accept: 'item',
        collect ( monitor ) {
            return { handlerId: monitor.getHandlerId() }
        },
        drop ( item: IItem ) {
            onDrop( item, data )
        },
        hover ( item: IItem ) {
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
