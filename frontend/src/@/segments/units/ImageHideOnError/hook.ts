import { useCallback, useState } from 'react'
import { useIconsStore }         from 'src/@/services/icon/store'
import { useHookResult }         from 'src/@/shared/hooks/useHookResult'

interface HImageHideOnError
{
    visible: boolean
    onLoad: () => void
    onError: () => void
}

export
function useImageHideOnError
( src: string | undefined ): HImageHideOnError
{
    const { loaded, error } = useIconsStore()

    const [ visible, $visible ] = useState<boolean>( !!( src && loaded.includes( src ) && !error.includes( src )))

    const onLoad = useCallback(
        () => {
            $visible( true )
        },
        []
    )

    const onError = useCallback(
        () => {
            $visible( false )
        },
        []
    )

    return useHookResult({
        visible,
        onLoad,
        onError
    })
}
