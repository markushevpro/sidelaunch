import type { PropsWithChildren } from 'react'

interface PVisible
extends
PropsWithChildren
{
    If: unknown
}

export
function Visible
({ If, children }: PVisible )
{
    if ( !If ) {
        return null
    }

    return (
        <>
            { children }
        </>
    )
}
