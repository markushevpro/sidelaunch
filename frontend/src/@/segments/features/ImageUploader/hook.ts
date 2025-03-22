import { useCallback }    from 'react'
import { useHookResult }  from 'src/@/shared/hooks/useHookResult'
import { getBase64Image } from 'src/@/shared/utils/images'
import { SaveIcon }       from 'wailsjs/go/main/App'

interface HImageUploader
{
    before: ( file: File ) => Promise<boolean>
}

export
function useImageUploader
( id: string, onDone?: () => void ): HImageUploader
{
    const before = useCallback(
        async ( file: File ) => {
            const data = await getBase64Image( file )
            await SaveIcon( id, data )
            onDone?.()
            return false
        },
        [ id, onDone ]
    )

    return useHookResult({ before })
}
