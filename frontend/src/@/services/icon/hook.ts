import { useCallback, useEffect, useMemo, useState } from 'react'
import { useHookResult }                             from 'src/@/shared/hooks/useHookResult'
import { isFolder }                                  from 'src/@/shared/utils/items'
import { byProtocol }                                from 'src/@/shared/utils/protocols'
import { ExtractIcon }                               from 'wailsjs/go/main/App'

import type { AppItem, ListItem } from 'src/@/shared/types/items'

interface HIcon
{
    icon: string
    fallback?: string
    fix: () => void
    force: () => void
}

export
function useIcon
( data: ListItem | undefined ): HIcon
{
    const [ reload, $reload ] = useState<string>( '' )

    const icon = useMemo(
        () => data ? `/data/icons/${data.id}.png` : '',
        [ data ]
    )

    const fallback = useMemo(
        () => ( data && isFolder( data ) ? '/assets/folder.png' : undefined ),
        [ data ]
    )

    const force = useCallback(
        () => {
            $reload( Math.random().toString().substring( 2, 8 ))
        },
        []
    )

    const fix = useCallback(
        () => {
            if ( data && ( data as AppItem )?.path ) {
                byProtocol(
                    data as AppItem,
                    {
                        'com.epicgames.launcher': () => {
                            console.log( 'Epic icon not implemented' )
                        },

                        mailrugames: () => {
                            console.log( 'VKPlay icon not implemented' )
                        },

                        steam: () => {
                            console.log( 'Steam icon not implemented' )
                        },

                        http: () => {
                            console.log( 'HTTP icon not implemented' )
                        },

                        _: async ( path: string ) => {
                            const res = await ExtractIcon( data.id, path )

                            if ( !res.includes( 'error' )) {
                                force()
                            }
                        }
                    }
                )
            }
        },
        [ data, force ]
    )

    useEffect(
        () => {
            window.runtime.EventsOn( 'iconchanged', ( id: string ) => {
                if ( data && id === data.id ) {
                    force()
                }
            })

            return () => {
                window.runtime.EventsOff( 'iconchanged' )
            }
        },
        [ data, force ]
    )

    return useHookResult({
        icon: reload ? `${icon}?${reload}` : icon,
        fallback,
        fix,
        force
    })
}
