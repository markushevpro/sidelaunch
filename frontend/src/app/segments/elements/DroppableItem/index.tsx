import { useRef }  from 'react'
import { useDrop } from 'react-dnd'

import type { Identifier }                   from 'dnd-core'
import type { PropsWithChildren, ReactNode } from 'react'
import type { PFileItem }                    from 'src/app/segments/elements/FileItem'
import type { IItem }                        from 'src/app/shared/types/items'

export
interface PDroppableItem
extends
PFileItem,
PropsWithChildren
{
    hidden?: boolean,
    onMove: ( currentItem: IItem, hoverItem: IItem ) => void,
    onDrop: ( currentItem: IItem, targetItem: IItem ) => void
}

export
function DroppableItem
({ hidden, data, children, className, onMove, onDrop }: PDroppableItem ): ReactNode
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

            onMove( item, data )
        }
    })

    if ( hidden ) { return null }

    drop( ref )

    return (
        <div
            ref={ref}
            className={className}
            data-handler-id={handlerId}
        >
            { children }
        </div>
    )
}
