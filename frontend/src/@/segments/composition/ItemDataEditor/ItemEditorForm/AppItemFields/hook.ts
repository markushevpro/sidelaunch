import { useCallback, useEffect, useRef } from 'react'

import { useHookResult }    from 'src/@/shared/hooks/useHookResult'
import { useSystemDialogs } from 'src/@/shared/hooks/useSystemDialogs'
import { ShowInExplorer }   from 'wailsjs/go/main/App'

import type { MutableRefObject } from 'react'

interface HAppItemFields
{
    pathRef: MutableRefObject<HTMLInputElement | null>
    showInExplorer: ( path: string, dir?: boolean ) => () => void
    searchFile: ( onFound: ( val: string ) => void ) => () => Promise<void>
    searchDir: ( onFound: ( val: string ) => void ) => () => Promise<void>
}

export
function useAppItemFields
( isUrl: boolean ): HAppItemFields
{
    const { openFile, openDir } = useSystemDialogs()

    const pathRef = useRef<HTMLInputElement | null>( null )

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

    const focusPath = useCallback(
        () => {
            console.log( 'focus path' )
            setTimeout(
                () => {
                    if ( pathRef.current ) {
                        pathRef.current.focus()
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
            if ( isUrl ) {
                focusPath()
            }
        },
        [ isUrl, focusPath ]
    )

    return useHookResult({
        pathRef,
        showInExplorer,
        searchFile,
        searchDir
    })
}
