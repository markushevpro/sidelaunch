import { useCallback, useEffect, useMemo, useState } from 'react'

import { useConfig }     from 'src/@/services/config/hook'
import { useHookResult } from 'src/@/shared/hooks/useHookResult'

interface HIconButton
{
    src: string
    size: number | undefined
    loading: boolean
    loaded: () => void
    error: () => void
}

export
function useIconButton
( icon: string, fallback?: string, onError?: () => void ): HIconButton
{
    const { config } = useConfig()

    const [ error, $error ]     = useState<boolean>( false )
    const [ failed, $failed ]   = useState<boolean>( false )
    const [ loading, $loading ] = useState<boolean>( true )

    const src = useMemo(
        (): string => {
            if ( error ) {
                return fallback ?? ''
            }

            return icon
        },
        [ error, fallback, icon ]
    )

    const loaded = useCallback(
        () => {
            $loading( false )
        },
        []
    )

    const handleError = useCallback(
        () => {
            if ( !failed ) {
                onError?.()

                if ( error ) {
                    $failed( true )
                } else {
                    $error( true )
                }

                loaded()
            }
        },
        [ error, failed, loaded, onError ]
    )

    useEffect(
        () => {
            $error( false )
        },
        [ icon ]
    )

    return useHookResult({
        src,
        size:  config.iconSize,
        loading,
        loaded,
        error: handleError
    })
}
