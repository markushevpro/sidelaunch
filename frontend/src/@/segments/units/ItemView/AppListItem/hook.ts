import { useCallback }            from 'react'
import { useCurrentFolder }       from 'src/@/services/folder/hook'
import { useIcon }                from 'src/@/services/icon/hook'
import { useWindow }              from 'src/@/services/window/hook'
import { useHookResult }          from 'src/@/shared/hooks/useHookResult'
import { byProtocol }             from 'src/@/shared/utils/protocols'
import { OpenURL, RunExecutable } from 'wailsjs/go/main/App'

import type { AppItem } from 'src/@/shared/types/items'

import { useAppListtItemState } from './state'

interface HAppListItem
{
    loading: boolean
    error: string | undefined
    icon: ReturnType<typeof useIcon>
    click: () => void
}

export
function useAppListItem
( data: AppItem ): HAppListItem
{
    const icon          = useIcon( data )
    const { error }     = useAppListtItemState( data )
    const { hide }      = useWindow()
    const { isWaiting } = useCurrentFolder()

    const customProtocolRun = useCallback(
        async ( url: string ) => {
            await OpenURL( url )
        },
        []
    )

    const run = useCallback(
        () => {
            byProtocol(
                data,
                {
                    'com.epicgames.launcher': customProtocolRun,
                    mailrugames:              customProtocolRun,
                    steam:                    customProtocolRun,
                    http:                     customProtocolRun,

                    _: async ( path: string ) => {
                        await RunExecutable( path )
                    }
                }
            )
            hide()
        },
        [ customProtocolRun, data, hide ]
    )

    return useHookResult({
        loading: isWaiting( data ),
        error,
        icon,
        click:   run
    })
}
