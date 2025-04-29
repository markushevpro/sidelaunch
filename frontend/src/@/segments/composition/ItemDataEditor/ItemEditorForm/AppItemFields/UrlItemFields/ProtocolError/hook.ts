import { useMemo } from 'react'

import { useHookResult } from 'src/@/shared/hooks/useHookResult'

interface HProtocolError
{
    active: boolean
    show: boolean
    protocol: string | undefined
}

export
function useProtocolError
( value?: string ): HProtocolError
{
    const active   = useMemo(
        () => !!value?.includes( '://' ),
        [ value ]
    )
    const protocol = useMemo(
        () => active ? value?.split( '://' )[ 0 ] : undefined,
        [ active, value ]
    )

    const show = useMemo(
        () => ![ 'http', 'https' ].includes( protocol?.toLocaleLowerCase() ?? '' ),
        [ protocol ]
    )

    return useHookResult({
        active,
        show,
        protocol
    })
}
