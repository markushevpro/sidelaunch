import { useMemo }          from 'react'
import { useDropArea }      from 'src/@/services/dnd/useDropArea'
import { useCurrentFolder } from 'src/@/services/folder/hook'
import { useHookResult }    from 'src/@/shared/hooks/useHookResult'

import type { ConnectDropTarget } from 'react-dnd'

import styles from './drop-layer.module.css'

// https://github.com/wailsapp/wails/issues/3985
// eslint-disable-next-line @typescript-eslint/no-empty-function
window.runtime.OnFileDrop(( x, y, paths ) => {}, false )

interface HDropLayer
{
    ref: ConnectDropTarget
    dropClassName: string | null
}

export
function useDropLayer
(): HDropLayer
{
    const { append }     = useCurrentFolder()
    const { ref, state } = useDropArea(( files: string[]) => {
        void append( files )
    })

    const dropClassName = useMemo(
        () => {
            if ( !state.isOver ) {
                return null
            }

            return state.canDrop
                ? styles.canDrop
                : styles.cantDrop
        },
        [ state.canDrop, state.isOver ]
    )

    return useHookResult({
        ref,
        dropClassName
    })
}
