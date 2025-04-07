import { useCallback, useEffect, useMemo, useState } from 'react'

import type { ChangedProps, ChangeModifier } from './types'
import type { JSXElementConstructor }        from 'react'

interface PChangedProvider
<T extends object>
{
    initial: T
    component: JSXElementConstructor<ChangedProps<T>>
}

export
function ChangedProvider
<T extends object>
({ initial, component }: PChangedProvider<T> )
{
    const [ data, $data ] = useState<T>({ ...initial })

    const changed = useMemo(() => JSON.stringify( initial ) !== JSON.stringify( data ), [ initial, data ])

    const Component = useMemo(() => component, [ component ])

    const onChange = useCallback(
        <K extends keyof T>( key: K, modifier?: ChangeModifier<T, K> ) => ( value: T[K]) => {
            $data({
                ...data,
                [ key ]: modifier ? modifier( value ) : value
            })
        },
        [ data ]
    )

    useEffect(
        () => {
            $data( initial )
        },
        [ initial ]
    )

    return (
        <Component changed={changed} data={data} onChange={onChange} />
    )
}
