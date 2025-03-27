import { useCallback } from 'react'

import { useHookResult }                      from 'src/@/shared/hooks/useHookResult'
import { useSystemDialogs }                   from 'src/@/shared/hooks/useSystemDialogs'
import { ExtractIcon, SaveIcon, SystemError } from 'wailsjs/go/main/App'

const imageExts = [ 'png', 'jpg', 'jpeg' ]
const iconExts  = [ 'exe', 'ico' ]

interface HImageUploader
{
    open: () => void
}

export
function useImageUploader
( id: string, onDone?: () => void ): HImageUploader
{
    const { openFile } = useSystemDialogs()

    const open = useCallback(
        async () => {
            const path = await openFile([ ...imageExts, ...iconExts ], 'Load icon' )

            if ( path ) {
                const ext = path.split( '.' ).pop()?.toLocaleLowerCase() ?? ''

                if ( imageExts.includes( ext )) {
                    await SaveIcon( id, path )
                    onDone?.()
                } else if ( iconExts.includes( ext )) {
                    await ExtractIcon( id, path )
                    onDone?.()
                } else {
                    await SystemError( 'error', 'Wrong file type', 'Unsupported file format' )
                }
            }
        },
        [ id, onDone, openFile ]
    )

    return useHookResult({ open })
}
