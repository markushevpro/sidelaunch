import { useRef }           from 'react'
import { useDrag, useDrop } from 'react-dnd'

import ListItem, { TListItemProps } from '../ListItem/ListItem'

import type { Identifier, XYCoord } from 'dnd-core'

export interface TDraggableProps extends TListItemProps {
    index: number,
    onMove: ( dragIndex: number, hoverIndex: number ) => void
}

interface DragItem {
    weight: number
    id: string
    type: string
}

export const DraggableItem = ({ index, data, size, className, onMove }: TDraggableProps ) => {
    const
        ref = useRef<HTMLDivElement>( null ),
        [ { handlerId }, drop ] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
            accept: 'item',
            collect ( monitor ) {
                return { handlerId: monitor.getHandlerId(), }
            },
            hover ( item: DragItem, monitor ) {
                if ( !ref.current ) {
                    return
                }

                const
                    dragIndex = item.weight,
                    hoverIndex = index

                if ( dragIndex === hoverIndex ) {
                    return
                }

                const
                    hoverBoundingRect = ref.current?.getBoundingClientRect(),
                    hoverMiddleY = ( hoverBoundingRect.bottom - hoverBoundingRect.top ) / 2,
                    clientOffset = monitor.getClientOffset(),
                    hoverClientY = ( clientOffset as XYCoord ).y - hoverBoundingRect.top

                if ( dragIndex < hoverIndex && hoverClientY < hoverMiddleY ) {
                    return
                }

                if ( dragIndex > hoverIndex && hoverClientY > hoverMiddleY ) {
                    return
                }

                onMove( dragIndex, hoverIndex )
                item.weight = hoverIndex
            },
        }),
        [ { isDragging }, drag ] = useDrag({
            type:    'item',
            item:    () => data,
            collect: ( monitor: any ) => ({ isDragging: monitor.isDragging(), }),
        }),
        opacity = isDragging ? 0 : 1

    drag( drop( ref ))

    return (
        <div
            ref = { ref }
            data-handler-id = { handlerId }
            style = {{ opacity }}
        >
            <ListItem
                className={className}
                data={data}
            />
        </div>
    )
}
