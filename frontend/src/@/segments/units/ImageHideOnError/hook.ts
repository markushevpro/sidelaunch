import { useCallback, useState } from 'react'
import { useIconsStore }         from 'src/@/services/icon/store'
import { useHookResult }         from 'src/@/shared/hooks/useHookResult'

interface HImageHideOnError
{
    visible: boolean
    onError: () => void
}

export
function useImageHideOnError
( src: string | undefined ): HImageHideOnError
{
    const { error } = useIconsStore()

    const [ visible, $visible ] = useState<boolean>( !!( src && !error.includes( src )))

    const onError = useCallback(
        () => {
            $visible( false )
        },
        []
    )

    return useHookResult({
        visible,
        onError
    })
}
