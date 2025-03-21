import { useCallback, useEffect, useMemo, useState } from 'react'
import { ListButton }                                from 'src/@/segments/units/ListButton'
import { useConfig }                                 from 'src/@/services/config/hook'

import type { ButtonProps } from 'src/@/shared/types/props'

interface PIconButton
extends
ButtonProps
{
    icon: string
    fallback?: string
    width?: number
    height?: number
    onError?: () => void
}

export
function IconButton
({ icon, fallback, width, height, onError, ...rest }: PIconButton )
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

    return (
        <ListButton {...rest}>
            <img
                draggable={false}
                height={height ?? config?.iconSize}
                src={src}
                width={width ?? config?.iconSize}
                onError={handleError}
            />
        </ListButton>
    )
}
