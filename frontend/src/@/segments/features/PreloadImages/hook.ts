import { useCallback, useEffect } from 'react'
import { useIconsStore }          from 'src/@/services/icon/store'
import { useLibrary }             from 'src/@/services/library/hook'

import { extractAllIDs } from './helpers'

export
function usePreloadImages
(): void
{
    const { library } = useLibrary()
    const { failed }  = useIconsStore()

    const onError = useCallback(
        ( src: string ) => () => {
            failed( src )
        },
        [ failed ]
    )

    useEffect(
        () => {
            console.log( 'icons updated' )
            const ids = extractAllIDs( library )

            ids.forEach( id => {
                const img = new Image()
                const src = `/data/icons/${id}.png`

                img.onerror = onError( src )
                img.src     = src
            })
        },
        [ library, onError ]
    )
}
