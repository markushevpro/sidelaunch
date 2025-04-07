import { useCallback } from 'react'

import { useHookResult }    from 'src/@/shared/hooks/useHookResult'
import { useSystemDialogs } from 'src/@/shared/hooks/useSystemDialogs'
import { ShowInExplorer }   from 'wailsjs/go/main/App'

interface HAppItemFields
{
    showInExplorer: ( path: string, dir?: boolean ) => () => void
    searchFile: ( onFound: ( val: string ) => void ) => () => Promise<void>
    searchDir: ( onFound: ( val: string ) => void ) => () => Promise<void>
}

export
function useAppItemFields
(): HAppItemFields
{
    const { openFile, openDir } = useSystemDialogs()

    const showInExplorer = useCallback(
        ( path: string, dir?: boolean ) => () => {
            void ShowInExplorer( path, !!dir )
        },
        []
    )

    const searchFile = useCallback(
        ( onFound: ( val: string ) => void ) => async () => {
            const path = await openFile([ '*' ], 'Search for file' )

            if ( path ) {
                onFound( path )
            }
        },
        [ openFile ]
    )

    const searchDir = useCallback(
        ( onFound: ( val: string ) => void ) => async () => {
            const path = await openDir( 'Search for directory' )

            if ( path ) {
                onFound( path )
            }
        },
        [ openDir ]
    )

    return useHookResult({
        showInExplorer,
        searchFile,
        searchDir
    })
}
