import { useRef }        from 'react'
import { useDrag }       from 'react-dnd'
import { useHookResult } from 'src/@/shared/hooks/useHookResult'

import type { RefObject }         from 'react'
import type { DragSourceMonitor } from 'react-dnd'

interface HDraggable
{
    ref: RefObject<HTMLDivElement>
    isDragging: boolean
}

export
function useDraggable
( data: unknown ): HDraggable
{
    const ref = useRef<HTMLDivElement>( null )

    const [ { isDragging }, drag ] = useDrag({
        type:    'item',
        item:    () => data,
        collect: ( monitor: DragSourceMonitor ) => ({ isDragging: monitor.isDragging() })
    })

    drag( ref )

    return useHookResult({
        ref,
        isDragging
    })
}
