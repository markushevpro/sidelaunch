import { useCallback, useEffect, useRef } from 'react'

import { useHookResult } from 'src/@/shared/hooks/useHookResult'

import type { MutableRefObject } from 'react'

interface HUrlItemFields
{
    ref: MutableRefObject<HTMLInputElement | null>
}

export
function useUrlItemFields
(): HUrlItemFields
{
    const ref = useRef<HTMLInputElement | null>( null )

    const focusPath = useCallback(
        () => {
            setTimeout(
                () => {
                    if ( ref.current ) {
                        ref.current.focus()
                    } else {
                        focusPath()
                    }
                },
                200
            )
        },
        []
    )

    useEffect(
        () => {
            focusPath()
        },
        [ focusPath ]
    )

    return useHookResult({ ref })
}
