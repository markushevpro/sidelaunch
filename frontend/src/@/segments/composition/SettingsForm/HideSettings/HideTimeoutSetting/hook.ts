import { useMemo, useCallback } from 'react'

import { useHookResult } from 'src/@/shared/hooks/useHookResult'

import type { SliderMarker } from 'src/@/shared/ui-kit/SliderInput/types'

const values  = [ '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1', '1.5', '2', '2.5', '3', '3.5', '4', '4.5', '5' ]
const visible = [ '0.1', '0.5', '1', '3', '5' ]

interface HHideTimeoutSetting
{
    val: number
    markers: SliderMarker[]
    change: ( index: string ) => void
}

export
function useHideTimeoutSetting
( value: number, onChange: ( value: number ) => void ): HHideTimeoutSetting
{
    const markers: SliderMarker[] = useMemo(
        () => {
            return values.map(( v, index ) => ({
                value:   `${index}`,
                label:   v,
                visible: visible.includes( v )
            }))
        },
        []
    )

    const val = useMemo(
        () => values.indexOf( `${value}` ),
        [ value ]
    )

    const change = useCallback(
        ( index: string ) => {
            onChange( parseFloat( values[ +index ]))
        },
        [ onChange ]
    )

    return useHookResult({
        val,
        markers,
        change
    })
}
