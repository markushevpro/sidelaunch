import type { PropsWithChildren } from 'react'

import { useReloadProvider } from './hook'

export
function ReloadProvider
({ children }: PropsWithChildren )
{
    useReloadProvider()

    return (
        <>
            { children }
        </>
    )
}
