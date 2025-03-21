import { useDraggable } from 'src/@/services/dnd/useDraggable'

import type { PropsWithChildren } from 'react'
import type { DivProps }          from 'src/@/shared/types/props'

export
interface PDraggable
extends
PropsWithChildren,
DivProps
{
    data: unknown
}

export
function Draggable
({ data, children, ...rest }: PDraggable )
{
    const { ref } = useDraggable( data )

    return (
        <div
            { ...rest }
            ref = { ref }
        >
            { children }
        </div>
    )
}
