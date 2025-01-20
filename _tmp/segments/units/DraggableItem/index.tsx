import { useMemo }      from 'react'
import { useDraggable } from 'src/@/services/dnd/useDraggable'

import type { PropsWithChildren } from 'react'
import type { Customizable }      from 'src/@/shared/types/props'

export
interface PDraggableItem
extends
PropsWithChildren,
Customizable
{
    data: unknown
}

export
function DraggableItem
({ data, children, className }: PDraggableItem )
{
    const { ref, isDragging } = useDraggable( data )
    const opacity             = useMemo(() => isDragging ? 0.5 : 1, [ isDragging ])

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
