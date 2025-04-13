import { useCallback, useMemo } from 'react'

import { useHookResult }               from 'src/@/shared/hooks/useHookResult'
import { isFolder }                    from 'src/@/shared/utils/items'
import { byProtocol }                  from 'src/@/shared/utils/protocols'
import { ExtractFavicon, ExtractIcon } from 'wailsjs/go/main/App'

import type { AppItem, ListItem } from 'src/@/shared/types/items'

import { useIconsStore } from './store'

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
    const { cache, revalidate } = useIconsStore()

    const icon = useMemo(
        () => data ? `/data/icons/${data.id}.png` : '',
        [ data ]
    )

    const fallback = useMemo(
        () => (
            data
                ? (
                    isFolder( data )
                        ? '/assets/folder.png'
                        : (
                            ( data as AppItem ).path?.includes( '://' )
                                ? '/assets/web.png'
                                : undefined
                        )
                )
                : undefined
        ),
        [ data ]
    )

    const faviconExtractor = useCallback(
        async ( url: string ) => {
            if ( data?.id ) {
                const res = await ExtractFavicon( data.id, url )

                if ( !res.includes( 'error' )) {
                    revalidate()
                }
            }
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

                        http:  faviconExtractor,
                        https: faviconExtractor,

                        _: async ( path: string ) => {
                            const res = await ExtractIcon( data.id, path )

                            if ( !res.includes( 'error' )) {
                                revalidate()
                            }
                        }
                    }
                )
            }
        },
        [ data, faviconExtractor ]
    )

    return useHookResult({
        icon:  `${icon}?${cache}`,
        fallback,
        fix,
        force: revalidate
    })
}
