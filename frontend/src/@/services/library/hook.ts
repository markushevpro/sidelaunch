import { useCallback, useEffect } from 'react'
import { useHookResult }          from 'src/@/shared/hooks/useHookResult'
import { LoadLibrary }            from 'wailsjs/go/main/App'

import type { FolderItem, Library, ListItem } from 'src/@/shared/types/items'

import { useLibraryStore } from './store'

interface HLibrary
{
    library: Library | undefined
    move: ( from?: string, to?: string ) => ( item: ListItem ) => void
    create: ( parent: FolderItem ) => void
}

export
function useLibrary
(): HLibrary
{
    const { library, update } = useLibraryStore()

    const load = useCallback(
        async () => {
            const raw = await LoadLibrary()

            try {
                const data = JSON.parse( raw )

                if ( data ) {
                    update({ library: data })
                } else {
                    throw new Error( 'No data in library' )
                }
            } catch ( e ) {
                console.error( e )
            }
        },
        [ update ]
    )

    const move = useCallback(
        ( from?: string, to?: string ) => ( item: ListItem ) => {
            if ( from && to ) {
                console.log( 'move item', {
                    item,
                    from,
                    to
                })
                // save
            }
        },
        []
    )

    const create = useCallback(
        ( parent: FolderItem ) => {
            console.log( 'create folder', { parent })
            console.log( 'go to new folder' )
        },
        []
    )

    useEffect(
        () => {
            if ( !library ) {
                void load()
            }
        },
        [ library, load ]
    )

    return useHookResult({
        library,
        move,
        create
    })
}
