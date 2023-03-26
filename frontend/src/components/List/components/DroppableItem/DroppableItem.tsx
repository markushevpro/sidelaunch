import { useRef }  from 'react'
import { useDrop } from 'react-dnd'

import { TItem }         from 'models'
import { TWithChildren } from 'utils'

import { TListItemProps } from '../ListItem/ListItem'

import type { Identifier } from 'dnd-core'

export interface TDroppableProps extends TListItemProps, TWithChildren {
    hidden?: boolean,
    onMove: ( currentItem: TItem, hoverItem: TItem ) => void,
    onDrop: ( currentItem: TItem, targetItem: TItem ) => void
}

export const DroppableItem = ({ hidden, data, children, className, onMove, onDrop }: TDroppableProps ) => {

    if ( hidden ) { return null }

    const
        ref = useRef<HTMLDivElement>( null ),
        [ { handlerId }, drop ] = useDrop<TItem, void, { handlerId: Identifier | null }>({
            accept: 'item',
            collect ( monitor ) {
                return { handlerId: monitor.getHandlerId(), }
            },
            drop ( item: TItem ) {
                onDrop( item, data )
            },
            hover ( item: TItem ) {
                if ( !ref.current ) {
                    return
                }

                onMove( item, data )
            },
        })

    drop( ref )

    return (
        <div
            ref = { ref }
            className={className}
            data-handler-id = { handlerId }
        >
            { children }
        </div>
    )
}
