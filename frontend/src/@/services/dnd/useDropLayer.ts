import { useMemo }     from 'react'
import { useDrop }     from 'react-dnd'
import { NativeTypes } from 'react-dnd-html5-backend'

import type { ConnectDropTarget, DropTargetMonitor } from 'react-dnd'

interface DropItem
{
    files: File[]
}

interface HDropLayer
{
    ref: ConnectDropTarget
    state: {
        isOver: boolean
        canDrop: boolean
    }
}

export
function useDropLayer
( onDrop: ( file: unknown ) => void ): HDropLayer
{
    const [ { canDrop, isOver }, drop ] = useDrop(
        () => ({
            accept: [ NativeTypes.FILE ],

            drop ( item: DropItem ) {
                onDrop && onDrop( item.files )
            },

            canDrop ( item: DropItem ) {
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
