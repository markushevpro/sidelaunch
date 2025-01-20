import cn              from 'classnames'
import { useCallback } from 'react'

interface PBackArrow
{
    target?: string,
    className?: string
}

export
function BackArrow
({ className, target }: PBackArrow )
{
    const goBack = useCallback(
        () => {
            // store.set( target ?? 'top' )
        },
        []
    )

    if ( !target ) { return null }

    return (
        <li className={cn( 'center-container', className )} onClick={goBack}>
            &lt;-
        </li>
    )
}
