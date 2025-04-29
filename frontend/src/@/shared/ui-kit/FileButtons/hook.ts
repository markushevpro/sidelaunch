import { useCallback, useMemo } from 'react'

import { useHookResult }  from 'src/@/shared/hooks/useHookResult'
import { ShowInExplorer } from 'wailsjs/go/main/App'

import type { SearchFunction } from './types'

interface HFileButtons
{
    searcher: (() => Promise<void> ) | undefined
    external: () => void
}

export
function useFileButtons
(
    value: string | undefined,
    dir: boolean | undefined,
    onChange: ( val: string ) => void,
    onSearch?: SearchFunction
): HFileButtons
{
    const external = useCallback(
        () => {
            if ( value ) {
                void ShowInExplorer( value, !!dir )
            }
        },
        [ dir, value ]
    )

    const searcher = useMemo(
        () => {
            if ( !onSearch ) {
                return
            }

            return onSearch( onChange )
        },
        [ onSearch, onChange ]
    )

    return useHookResult({
        external,
        searcher
    })
}
