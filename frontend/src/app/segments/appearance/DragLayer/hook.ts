import { useMemo }     from 'react'
import { useDrop }     from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'

import type { ConnectDropTarget, DropTargetMonitor } from 'react-dnd'

interface DragItem
{
    files: File[]
}

interface HDragLayer
{
    ref: ConnectDropTarget
    state: {
        isOver: boolean
        canDrop: boolean
    }
}

export
function useDragLayer
( onDrop: ( file: unknown ) => void ): HDragLayer
{
    const [ { canDrop, isOver }, drop ] = useDrop(
        () => ({
            accept: [ NativeTypes.FILE ],

            drop ( item: DragItem ) {
                onDrop && onDrop( item.files )
            },

            canDrop ( item: DragItem ) {
                if ( !item.files[ 0 ]?.type && !item.files[ 0 ]?.size ) { return false }
                return true
            },

            collect: ( monitor: DropTargetMonitor ) => {
                return {
                    isOver:  monitor.isOver(),
                    canDrop: monitor.canDrop()
                }
            }
        }),
        []
    )

    const state = useMemo(
        () => ({
            isOver,
            canDrop
        }),
        [ canDrop, isOver ]
    )

    return useMemo(
        () => ({
            ref: drop,
            state
        }),
        [ drop, state ]
    )
}
