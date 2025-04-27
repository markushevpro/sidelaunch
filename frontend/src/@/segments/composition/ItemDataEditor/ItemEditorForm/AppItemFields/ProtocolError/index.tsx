import { useMemo } from 'react'

import styles from './protocol-error.module.css'

interface PProtocolError
{
    value: string | undefined
}

export
function ProtocolError
({ value }: PProtocolError )
{
    const active   = useMemo(
        () => value?.includes( '://' ),
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

    if ( !active || !show ) {
        return null
    }

    return (
        <p className={styles.error}>
            Automatic loading of icons for protocol &quot;
            {protocol}
            &quot; is unsupported
        </p>
    )
}
