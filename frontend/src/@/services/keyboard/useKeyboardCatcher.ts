import { useCallback } from 'react'

import type { MouseEvent } from 'react'

import { useKeyboardStore } from './store'

export
function useKeyboardCatcher
<T extends MouseEvent>
( handler: ( e: T ) => unknown ): ( e: T ) => ReturnType<typeof handler>
{
    const { update } = useKeyboardStore()

    return useCallback(
        ( e: T ) => {
            update({ ctrl: e.ctrlKey })
            return handler( e )
        },
        [ handler, update ]
    )
}
