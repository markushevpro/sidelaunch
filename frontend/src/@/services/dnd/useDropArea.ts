import { useEffect, useMemo } from 'react'
import { useDrop }            from 'react-dnd'
import { NativeTypes }        from 'react-dnd-html5-backend'

import { useWindowStore } from 'src/@/services/window/store'

import type { ConnectDropTarget, DropTargetMonitor } from 'react-dnd'

export
interface DropItem
{
    files: File[]
}

interface HDropArea
{
    ref: ConnectDropTarget
    state: {
        isOver: boolean
        canDrop: boolean
    }
}

export
function useDropArea
( onDrop: ( file: string[]) => void ): HDropArea
{
    const { update }                    = useWindowStore()
    const [ { canDrop, isOver }, drop ] = useDrop(
        () => ({
            accept: [ NativeTypes.FILE ],

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

    useEffect(
        () => {
            window.runtime.EventsOn( 'filedrop', ( files: string[]) => {
                update({ drop: false })
                onDrop( files )
            })

            return () => {
                window.runtime.EventsOff( 'filedrop' )
            }
        },
        [ onDrop, update ]
    )

    return useMemo(
        () => ({
            ref: drop,
            state
        }),
        [ drop, state ]
    )
}
