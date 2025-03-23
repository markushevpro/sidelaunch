import { useCallback }                    from 'react'
import { OpenDir, OpenFile, SystemError } from 'wailsjs/go/main/App'

import { useHookResult } from './useHookResult'

function makerPattern ( exts: string[]): string
{
    return exts.map( ext => `*.${ext}` ).join( ';' )
}

interface OpenDialogResponse
{
    path?: string
    error?: string
}

interface HSystemDialogs
{
    openFile: ( exts: string[], title?: string ) => Promise<string | undefined>
    openDir: ( title?: string ) => Promise<string | undefined>
}

export
function useSystemDialogs
(): HSystemDialogs
{
    const openFile = useCallback(
        async ( exts: string[], title?: string ) => {
            const res: OpenDialogResponse = JSON.parse( await OpenFile( title ?? 'Open file', [
                {
                    DisplayName: 'Allowed files',
                    Pattern:     makerPattern( exts )
                }
            ]))

            if ( res.path ) {
                return res.path
            } else if ( res.error ) {
                await SystemError( 'error', 'Something goes wrong', res.error )
            }
        },
        []
    )

    const openDir = useCallback(
        async ( title?: string ) => {
            const res: OpenDialogResponse = JSON.parse( await OpenDir( title ?? 'Open directory' ))

            if ( res.path ) {
                return res.path
            } else if ( res.error ) {
                await SystemError( 'error', 'Something goes wrong', res.error )
            }
        },
        []
    )

    return useHookResult({
        openFile,
        openDir
    })
}
