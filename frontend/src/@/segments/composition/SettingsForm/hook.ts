import { useCallback, useState } from 'react'

import { useConfig }          from 'src/@/services/config/hook'
import { useHookResult } from 'src/@/shared/hooks/useHookResult'
import { AppConfig } from 'src/@/shared/types/items'
import { Reload, SaveConfig } from 'wailsjs/go/main/App'

interface HSettingsForm
{
    loading: boolean
    save: () => Promise<void>
}

export
function useSettingsForm
( data: AppConfig ): HSettingsForm
{    
    const { load } = useConfig()

    const [ loading, $loading ] = useState<boolean>( false )

    const save = useCallback(
        async () => {
            $loading( true )

            await SaveConfig( JSON.stringify( data ))
            await load()
            await Reload( 'config', '' )

            if ( data.fixed ) {
                await Reload( 'show', '' )
            } else {
                await Reload( 'hide', '' )
            }

            $loading( false )
        },
        [ data, load ]
    )

    return useHookResult({ loading, save })
}