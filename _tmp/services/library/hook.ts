import { useCallback, useEffect } from 'react'
import { useHookResult }          from 'src/@/shared/hooks/useHookResult'
import { LoadLibrary }            from 'wailsjs/go/main/App'

import type { ILibrary } from 'src/@/shared/types/items'

import { useLibraryStore } from './store'

interface HLibrary
{
    library: ILibrary | undefined
}

export
function useLibrary
(): HLibrary
{
    const { library, update } = useLibraryStore()

    const load = useCallback(
        async () => {
            const raw = await LoadLibrary()

            try {
                const data = JSON.parse( raw )

                if ( data ) {
                    update({ library: data })
                } else {
                    throw new Error( 'No data in config' )
                }
            } catch ( e ) {
                console.error( e )
            }
        },
        [ update ]
    )

    useEffect(
        () => {
            if ( !library ) {
                void load()
            }
        },
        [ library, load ]
    )

    return useHookResult({ library })
}
