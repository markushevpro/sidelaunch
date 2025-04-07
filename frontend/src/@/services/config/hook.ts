import { useCallback, useEffect, useMemo, useState } from 'react'

import { useHookResult } from 'src/@/shared/hooks/useHookResult'
import { LoadConfig }    from 'wailsjs/go/main/App'

import type { AppConfig } from 'src/@/shared/types/items'

import { defaultConfig }  from './conts'
import { useConfigStore } from './store'

interface HConfig
{
    config: AppConfig
    load: () => Promise<void>
}

export
function useConfig
(): HConfig
{
    const { config, update } = useConfigStore()

    const [ loading, $loading ] = useState<boolean>( false )

    const load = useCallback(
        async () => {
            $loading( true )

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

            $loading( false )
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

    useEffect(
        () => {
            const watcher = ([ _, what ]: string[]): void => {
                if ( !loading && what === 'config' ) {
                    void load()
                }
            }

            window.runtime.EventsOn( 'reload', watcher )

            return () => {
                window.runtime.EventsOff( 'reload' )
            }
        },
        [ load, loading ]
    )

    return useHookResult({
        config: fixed,
        load
    })
}
