import type { ChangeEvent } from 'react'

export
function getValueFromInput
( handler: ( val: string ) => unknown ): ( e: ChangeEvent<HTMLInputElement> ) => unknown
{
    return ( e: ChangeEvent<HTMLInputElement> ) => {
        handler( e.target.value )
    }
}
