import { useEffect } from 'react'

import { useWindowStore } from './store'

export
function useNormalWindow
(): void
{
    const { fix } = useWindowStore()

    useEffect(
        () => {
            fix()
        },
        [ fix ]
    )
}
