import { useDroppable } from 'src/@/services/dnd/useDroppable'

import type { PropsWithChildren } from 'react'
import type { ListItem }          from 'src/@/shared/types/items'
import type { DivProps }          from 'src/@/shared/types/props'

export
interface PAllowDrop
extends
PropsWithChildren,
Omit<DivProps, 'onDrop'>
{
    data?: ListItem
    onDrop: ( income: ListItem ) => void | Promise<void>
    onHover?: ( income: ListItem ) => void,
}

export
function AllowDrop
({ data, children, onHover, onDrop, ...rest }: PAllowDrop )
{
    const { ref, id } = useDroppable( data, onDrop, onHover )

    return (
        <div {...rest} ref={ref} data-handler-id={id}>
            { children }
        </div>
    )
}
