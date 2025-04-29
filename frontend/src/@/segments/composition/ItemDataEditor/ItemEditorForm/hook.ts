import { useCallback, useMemo, useState } from 'react'

import { useIconsStore }          from 'src/@/services/icon/store'
import { useLibrary }             from 'src/@/services/library/hook'
import { useAppView }             from 'src/@/services/view/hook'
import { useHookResult }          from 'src/@/shared/hooks/useHookResult'
import { isFolder }               from 'src/@/shared/utils/items'
import { usePageData }            from 'src/@/shared/utils/routes'
import { ExtractFavicon, Reload } from 'wailsjs/go/main/App'

import type { AppItem, FolderItem, ListItem } from 'src/@/shared/types/items'

interface HItemEditorForm
{
    loading: boolean
    canSave: boolean
    isApp: boolean
    isUrl: boolean
    save: () => void
    cancel: () => void
}

export
function useItemEditorForm
( data: ListItem, changed: boolean ): HItemEditorForm
{
    const { updateItem } = useLibrary()
    const { item }       = useAppView()
    const { page }       = usePageData()
    const { revalidate } = useIconsStore()

    const appItem = data as AppItem

    const [ loading, $loading ] = useState<boolean>( false )

    const isApp = useMemo(
        () => !!( data && !isFolder( data )),
        [ data ]
    )

    const isUrl = useMemo(
        () => page === 'editurl',
        [ page ]
    )

    const canSave = useMemo(
        () => !isApp || !!appItem.path,
        [ isApp, appItem ]
    )

    const checkIcon = useCallback(
        async () => {
            await new Promise<void>( resolve => {
                if ( appItem.path?.includes( '://' )) {
                    const img = new Image()

                    img.onerror = async () => {
                        await ExtractFavicon( appItem.id, appItem.path ?? '' )
                        void Reload( 'icon', '' )
                        revalidate()
                        console.log( 'Error loading icon' )
                        resolve()
                    }

                    img.onload = () => {
                        setTimeout(() => {
                            resolve()
                        }, 1000 )
                    }

                    img.src = `/data/icons/${appItem.id}.png`
                } else {
                    console.log( 'Not url, skipping icon' )
                    resolve()
                }
            })
        },
        [ appItem.id, appItem.path, revalidate ]
    )

    const save = useCallback(
        async () => {
            if ( item && changed ) {
                $loading( true )

                if ( isFolder( data )) {
                    await updateItem( item as FolderItem, { name: data.name })
                } else {
                    await updateItem( item as AppItem, data )
                    await checkIcon()
                }

                $loading( false )
                window.runtime.Quit()
            }
        },
        [ item, changed, data, updateItem, checkIcon ]
    )

    const cancel = useCallback(
        () => {
            window.runtime.Quit()
        },
        []
    )

    return useHookResult({
        loading,
        canSave,
        isApp,
        isUrl,
        save,
        cancel
    })
}
