import { useCallback, useMemo, useState } from 'react'
import { useLibrary }                     from 'src/@/services/library/hook'
import { useAppView }                     from 'src/@/services/view/hook'
import { useHookResult }                  from 'src/@/shared/hooks/useHookResult'
import { isFolder }                       from 'src/@/shared/utils/items'

import type { AppItem, ListItem } from 'src/@/shared/types/items'

interface HItemDataEditor
{
    item: ListItem | undefined
    loading: boolean
    updated: boolean
    isApp: boolean
    changed: Record<string, string | undefined>
    updaters: Record<string, ( val: string ) => void>
    save: () => void
    cancel: () => void
}

export
function useItemDataEditor
(): HItemDataEditor
{
    const { updateItem } = useLibrary()
    const { item }       = useAppView()
    const appItem        = item as AppItem

    const [ loading, $loading ] = useState<boolean>( false )
    const [ changed, $changed ] = useState<Record<string, string | undefined>>({
        name:   item?.name,
        path:   appItem?.path,
        dir:    appItem?.dir,
        params: appItem?.params
    })

    const isApp = useMemo(
        () => !!( item && !isFolder( item )),
        [ item ]
    )

    const updated = useMemo(
        () => (
            !!(
                item && (
                    changed.name !== item?.name ||
                    changed.path !== appItem?.path ||
                    changed.dir !== appItem?.dir ||
                    changed.params !== appItem?.params
                )
            )
        ),
        [ item, changed, appItem ]
    )

    const update = useCallback(
        ( key: string ) => ( value: string ) => {
            $changed({
                ...changed,
                [ key ]: value
            })
        },
        [ changed ]
    )

    const updaters = useMemo(
        () => ({
            name:   update( 'name' ),
            path:   update( 'path' ),
            dir:    update( 'dir' ),
            params: update( 'params' )
        }),
        [ update ]
    )

    const save = useCallback(
        async () => {
            if ( item && updated ) {
                $loading( true )

                if ( isFolder( item )) {
                    await updateItem( item, { name: changed.name })
                } else {
                    await updateItem( item as AppItem, changed )
                }

                $loading( false )
                window.runtime.Quit()
            }
        },
        [ changed, item, updateItem, updated ]
    )

    const cancel = useCallback(
        () => {
            window.runtime.Quit()
        },
        []
    )

    return useHookResult({
        item,
        loading,
        updated,
        changed,
        updaters,
        isApp,
        save,
        cancel
    })
}
