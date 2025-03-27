import { useCallback, useEffect } from 'react'

import { useIconsStore } from 'src/@/services/icon/store'
import { useLibrary }    from 'src/@/services/library/hook'

import { extractAllIDs } from './helpers'

export
function usePreloadImages
(): void
{
    const { library }         = useLibrary()
    const { failed, success } = useIconsStore()

    const onError = useCallback(
        ( src: string ) => () => {
            failed( src )
        },
        [ failed ]
    )

    const onSuccess = useCallback(
        ( src: string ) => () => {
            success( src )
        },
        [ success ]
    )

    useEffect(
        () => {
            const ids = extractAllIDs( library )

            ids.forEach( id => {
                const img = new Image()
                const src = `/data/icons/${id}.png`

                img.onerror = onError( src )
                img.onload  = onSuccess( src )
                img.src     = src
            })
        },
        [ library, onError, onSuccess ]
    )
}
