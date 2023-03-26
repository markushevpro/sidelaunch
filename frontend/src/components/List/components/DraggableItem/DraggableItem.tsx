import { useRef }  from 'react'
import { useDrag } from 'react-dnd'

import { TWithChildren } from 'utils'

import { TListItemProps } from '../ListItem/ListItem'

export interface TDraggableProps extends TListItemProps, TWithChildren {}

export const DraggableItem = ({ data, children, className }: TDraggableProps ) => {
    const
        ref = useRef<HTMLDivElement>( null ),
        [ { isDragging }, drag ] = useDrag({
            type:    'item',
            item:    () => data,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            collect: ( monitor: any ) => ({ isDragging: monitor.isDragging(), }),
        }),
        opacity = isDragging ? .5 : 1

    drag( ref )

    return (
        <div
            ref = { ref }
            className={className}
            style = {{ opacity }}
        >
            { children }
        </div>
    )
}
