import { useCallback, useState } from 'react'

import { useIconsStore } from 'src/@/services/icon/store'
import { useHookResult } from 'src/@/shared/hooks/useHookResult'

import type { ReactEventHandler, SyntheticEvent } from 'react'

interface HImageHideOnError
{
    visible: boolean
    loaded: ( e: SyntheticEvent<HTMLImageElement> ) => void
    error: ( e: SyntheticEvent<HTMLImageElement> ) => void
}

export
function useImageHideOnError
( src: string | undefined, onError?: ReactEventHandler<HTMLImageElement>, onLoad?: ReactEventHandler<HTMLImageElement> ): HImageHideOnError
{
    const { loaded, error } = useIconsStore()

    const [ visible, $visible ] = useState<boolean>( !!( src && loaded.includes( src ) && !error.includes( src )))

    const handleLoad = useCallback(
        ( e: SyntheticEvent<HTMLImageElement> ) => {
            $visible( true )
            onLoad?.( e )
        },
        [ onLoad ]
    )

    const handleError = useCallback(
        ( e: SyntheticEvent<HTMLImageElement> ) => {
            $visible( false )
            onError?.( e )
        },
        [ onError ]
    )

    return useHookResult({
        visible,
        loaded: handleLoad,
        error:  handleError
    })
}
