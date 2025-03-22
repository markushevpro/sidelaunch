import { useCallback, useEffect, useMemo, useState } from 'react'
import { useConfig }                                 from 'src/@/services/config/hook'
import { useHookResult }                             from 'src/@/shared/hooks/useHookResult'

interface HIconButton
{
    src: string
    size: number | undefined
    error: () => void
}

export
function useIconButton
( icon: string, fallback?: string, onError?: () => void ): HIconButton
{
    const { config } = useConfig()

    const [ error, $error ]   = useState<boolean>( false )
    const [ failed, $failed ] = useState<boolean>( false )

    const src = useMemo(
        (): string => {
            if ( error ) {
                return fallback ?? ''
            }

            return icon
        },
        [ error, fallback, icon ]
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
            }
        },
        [ error, failed, onError ]
    )

    useEffect(
        () => {
            $error( false )
        },
        [ icon ]
    )

    return useHookResult({
        src,
        size:  config?.iconSize,
        error: handleError
    })
}
