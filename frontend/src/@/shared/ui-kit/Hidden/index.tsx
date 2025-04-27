import type { PropsWithChildren } from 'react'

interface PHidden
extends
PropsWithChildren
{
    If: unknown
}

export
function Hidden
({ If, children }: PHidden )
{
    if ( If ) {
        return null
    }

    return (
        <>
            { children }
        </>
    )
}
