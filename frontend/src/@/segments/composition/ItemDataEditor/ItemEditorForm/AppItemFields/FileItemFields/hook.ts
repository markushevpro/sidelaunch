import { useCallback } from 'react'

import { fixDelimiter }     from 'src/@/services/library/helpers'
import { useHookResult }    from 'src/@/shared/hooks/useHookResult'
import { useSystemDialogs } from 'src/@/shared/hooks/useSystemDialogs'

type FoundFunction = ( val: string ) => void

interface HFileItemFields
{
    searchFile: ( onFound: FoundFunction ) => () => Promise<void>
    searchDir: ( onFound: FoundFunction ) => () => Promise<void>
    dirFromFile: ( onFound: FoundFunction ) => () => void
}

export
function useFileItemFields
( path: string ): HFileItemFields
{
    const { openFile, openDir } = useSystemDialogs()

    const searchFile = useCallback(
        ( onFound: FoundFunction ) => async () => {
            const path = await openFile([ '*' ], 'Search for file' )

            if ( path ) {
                onFound( path )
            }
        },
        [ openFile ]
    )

    const searchDir = useCallback(
        ( onFound: FoundFunction ) => async () => {
            const path = await openDir( 'Search for directory' )

            if ( path ) {
                onFound( path )
            }
        },
        [ openDir ]
    )

    const dirFromFile = useCallback(
        ( onFound: FoundFunction ) => () => {
            onFound( fixDelimiter( path ).split( '\\' ).slice( 0, -1 ).join( '\\' ))
        },
        [ path ]
    )

    return useHookResult({
        searchFile,
        searchDir,
        dirFromFile
    })
}
