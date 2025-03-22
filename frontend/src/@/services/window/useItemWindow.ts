import { useCallback, useEffect } from 'react'
import { useLibrary }             from 'src/@/services/library/hook'
import { useAppView }             from 'src/@/services/view/hook'
import { useHookResult }          from 'src/@/shared/hooks/useHookResult'
import { usePageData }            from 'src/@/shared/utils/routes'

import type { ListItem } from 'src/@/shared/types/items'

import { useWindowStore } from './store'

interface HItemWindow
{
    item: ListItem | undefined
}

export
function useItemWindow
( prefix?: string ): HItemWindow
{
    const { fix }          = useWindowStore()
    const { id }           = usePageData()
    const { find }         = useLibrary()
    const { item, update } = useAppView()

    const setItem = useCallback(
        () => {
            if ( !item && id ) {
                update({
                    view: 'edit',
                    item: find( id )
                })
            }
        },
        [ find, id, item, update ]
    )

    const setTitle = useCallback(
        () => {
            if ( item?.name ) {
                window.runtime.WindowSetTitle( `${prefix ?? ''}${item.name}` )
            }
        },
        [ item?.name, prefix ]
    )

    useEffect(
        () => { fix() },
        [ fix ]
    )

    useEffect(
        () => { setItem() },
        [ setItem ]
    )

    useEffect(
        () => { setTitle() },
        [ setTitle ]
    )

    return useHookResult({ item })
}
