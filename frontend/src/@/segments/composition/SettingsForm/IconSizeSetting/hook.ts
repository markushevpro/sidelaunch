import { useState, useCallback, useMemo } from 'react'

import { useLibrary }    from 'src/@/services/library/hook'
import { useHookResult } from 'src/@/shared/hooks/useHookResult'

interface HIconSizeSetting
{
    icon: string
    markers: string[]
    update: () => void
}

export
function useIconSizeSetting
(): HIconSizeSetting
{
    const { ids }         = useLibrary()
    const [ icon, $icon ] = useState<string>( '/assets/icon.png' )

    const markers = useMemo(() => [ '16', '24', '32', '40', '48' ], [])

    const getRandomIcon = useCallback(
        () => {
            const all = ids()

            if ( all.length > 0 ) {
                const id = all[ Math.round( Math.random() * all.length ) ]
                $icon( `/data/icons/${id}.png` )
            } else {
                $icon( '/assets/icon.png' )
            }
        },
        [ ids ]
    )

    return useHookResult({
        icon,
        markers,
        update: getRandomIcon
    })
}
