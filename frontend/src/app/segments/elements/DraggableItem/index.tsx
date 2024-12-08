import { useMemo, useRef } from 'react'
import { useDrag }         from 'react-dnd'

import type { PropsWithChildren, ReactNode } from 'react'
import type { DragSourceMonitor }            from 'react-dnd'
import type { PFileItem }                    from 'src/app/segments/elements/FileItem'

export
interface PDraggableItem
extends
PFileItem,
PropsWithChildren
{}

export
function DraggableItem
({ data, children, className }: PDraggableItem ): ReactNode
{
    const ref = useRef<HTMLDivElement>( null )

    const [ { isDragging }, drag ] = useDrag({
        type:    'item',
        item:    () => data,
        collect: ( monitor: DragSourceMonitor ) => ({ isDragging: monitor.isDragging() })
    })

    const opacity = useMemo(() => isDragging ? 0.5 : 1, [ isDragging ])

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
