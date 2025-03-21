import { useState, useCallback, useEffect } from 'react'
import { useHookResult }                    from 'src/@/shared/hooks/useHookResult'
import { byProtocol }                       from 'src/@/shared/utils/protocols'
import { CheckURL, CheckFile }              from 'wailsjs/go/main/App'

import type { AppItem } from 'src/@/shared/types/items'

interface HSmartItemState
{
    error: string | undefined
}

export
function useAppListtItemState
( data: AppItem ): HSmartItemState
{
    const [ error, $error ] = useState<string | undefined>()

    const checkError = useCallback(
        () => {
            byProtocol(
                data,
                {
                    'com.epicgames.launcher': () => { /* Do nothing */ },

                    mailrugames: () => { /* Do nothing */ },
                    steam:       () => { /* Do nothing */ },
                    http:        async ( url: string ) => {
                        const res = await CheckURL( url )

                        if ( res !== '200 OK' ) {
                            $error( res )
                        }
                    },

                    _: async ( path: string ) => {
                        $error( await CheckFile( path ))
                    }
                }
            )
        },
        [ data ]
    )

    useEffect(
        () => {
            checkError()
        },
        [ checkError ]
    )

    return useHookResult({ error })
}
