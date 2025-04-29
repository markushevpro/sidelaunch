import { useProtocolError } from './hook'
import styles               from './protocol-error.module.css'

interface PProtocolError
{
    value: string | undefined
}

export
function ProtocolError
({ value }: PProtocolError )
{
    const { active, show, protocol } = useProtocolError( value )

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
