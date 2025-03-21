import type { MouseEvent, PropsWithChildren } from 'react'

interface PRightClickProvider
extends
PropsWithChildren
{
    action: ( e: MouseEvent ) => void
}

export
function RightClickProvider
({ action, children }: PRightClickProvider )
{
    return (
        <div onContextMenu={action}>
            { children }
        </div>
    )
}
