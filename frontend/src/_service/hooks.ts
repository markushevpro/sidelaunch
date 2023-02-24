import { useEffect, useState } from 'react'

import { TConfigValue } from 'models'

import store from './store'

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
