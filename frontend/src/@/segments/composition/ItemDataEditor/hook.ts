import { useCallback, useMemo, useState } from 'react'

import { useIconsStore }          from 'src/@/services/icon/store'
import { useLibrary }             from 'src/@/services/library/hook'
import { useAppView }             from 'src/@/services/view/hook'
import { useHookResult }          from 'src/@/shared/hooks/useHookResult'
import { isFolder }               from 'src/@/shared/utils/items'
import { usePageData }            from 'src/@/shared/utils/routes'
import { ExtractFavicon, Reload } from 'wailsjs/go/main/App'

import type { AppItem, ListItem } from 'src/@/shared/types/items'

interface HItemDataEditor
{
    item: ListItem | undefined
    loading: boolean
    updated: boolean
    canSave: boolean
    isApp: boolean
    isUrl: boolean
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
    const { page }       = usePageData()
    const { revalidate } = useIconsStore()
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

    const isUrl = useMemo(
        () => page === 'editurl',
        [ page ]
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

    const canSave = useMemo(
        () => !isApp || !!changed.path,
        [ isApp, changed ]
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

    const checkIcon = useCallback(
        async ( item: ListItem ) => {
            await new Promise<void>( resolve => {
                if ( changed.path?.includes( '://' )) {
                    const img = new Image()

                    img.onerror = async () => {
                        await ExtractFavicon( item.id, changed.path ?? '' )
                        void Reload( 'icon', '' )
                        revalidate()
                        console.log( 'error resolve' )
                        resolve()
                    }

                    img.onload = () => {
                        setTimeout(() => {
                            console.log( 'load resolve' )
                            resolve()
                        }, 1000 )
                    }

                    img.src = `/data/icons/${item.id}.png`
                } else {
                    console.log( 'not url' )
                    resolve()
                }
            })
        },
        [ changed ]
    )

    const save = useCallback(
        async () => {
            if ( item && updated ) {
                $loading( true )

                if ( isFolder( item )) {
                    await updateItem( item, { name: changed.name })
                } else {
                    await updateItem( item as AppItem, changed )
                    await checkIcon( item )
                }

                $loading( false )
                window.runtime.Quit()
            }
        },
        [ changed, item, updateItem, updated, isUrl, checkIcon ]
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
        canSave,
        isApp,
        isUrl,
        save,
        cancel
    })
}
