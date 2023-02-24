import { useEffect, useState } from 'react'

import { TConfigValue, TFolder } from 'models'

import { emptyFolder } from './generate'
import store           from './store'

export const useConfig = ( key: string ) => {
    const
        [ result, $result ] = useState<TConfigValue>( '' )

    useEffect(() => {
        const
            getConfig = async () => {
                $result( store.config[ key ])
            }

        getConfig()
    }, [ key ])

    return result
}

export const useCurrent = () => {
    const
        { current } = store,
        [ result, $result ] = useState<TFolder>( emptyFolder )

    useEffect(() => {
        const
            getCurrent = async () => {
                $result( current )
            }

        getCurrent()
    }, [ current ])

    return result
}
