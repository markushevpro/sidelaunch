import { useCallback, useEffect, useMemo } from 'react'

import { useHookResult } from 'src/@/shared/hooks/useHookResult'
import { LoadConfig }    from 'wailsjs/go/main/App'

import type { AppConfig } from 'src/@/shared/types/items'

import { defaultConfig }  from './conts'
import { useConfigStore } from './store'

interface HConfig
{
    config: AppConfig
}

export
function useConfig
(): HConfig
{
    const { config, update } = useConfigStore()

    const load = useCallback(
        async () => {
            const raw = await LoadConfig()

            try {
                const data = JSON.parse( raw )

                if ( data ) {
                    update({
                        config: {
                            ...defaultConfig,
                            ...data
                        }
                    })
                } else {
                    throw new Error( 'No data in config' )
                }
            } catch ( e ) {
                console.error( e )
            }
        },
        [ update ]
    )

    const fixed = useMemo(
        () => {
            const res = {
                ...defaultConfig,
                ...config
            }

            res.iconSize = Math.max( 16, Math.min( 48, res.iconSize ))

            return res
        },
        [ config ]
    )

    useEffect(
        () => {
            if ( !config ) {
                void load()
            }
        },
        [ config, load ]
    )

    return useHookResult({ config: fixed })
}
