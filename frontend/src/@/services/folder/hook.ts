/* eslint-disable max-statements */
import { useCallback, useEffect } from 'react'

import { findInLibrary }         from 'src/@/services/library/helpers'
import { useLibrary }            from 'src/@/services/library/hook'
import { useHookResult }         from 'src/@/shared/hooks/useHookResult'
import { asFolder, sortHandler } from 'src/@/shared/utils/items'

import type { FolderItem, Library, ListItem } from 'src/@/shared/types/items'

import { useFolderStore } from './store'

interface HCurrentFolder
{
    folder: FolderItem | undefined
    items: ListItem[]
    refresh: ( lib: Library | undefined ) => Library | undefined
    resort: ( a: ListItem, b: ListItem ) => Promise<Library | undefined>
    append: ( files: string[]) => Promise<Library | undefined>
    move: ( item: ListItem, target: string ) => Promise<Library | undefined>
    sortLast: ( item: ListItem ) => Promise<Library | undefined>
    create: ( parent: FolderItem ) => Promise<void>
    remove: ( item: ListItem ) => Promise<Library | undefined>
    set: ( item: FolderItem | undefined ) => void
    goUp: () => void
    moveUp: ( item: ListItem ) => void
    waitUpdate: ( id: string ) => void
    isWaiting: ( data: ListItem ) => boolean
}

export
function useCurrentFolder
(): HCurrentFolder
{
    const { library, loading, find, load, ...handlers } = useLibrary()

    const { folder, items, waitUpdate: waitingUpdate, update } = useFolderStore()

    const _set = useCallback(
        ( f: FolderItem ) => {
            update({
                folder: f,
                items:  f.children.sort( sortHandler )
            })
        },
        [ update ]
    )

    const setTopFolder = useCallback(
        () => {
            if ( library ) {
                const top = asFolder( library, 'top' )
                _set( top )
            }
        },
        [ library, _set ]
    )

    const set = useCallback(
        ( f: FolderItem | undefined ) => {
            if ( !f ) {
                setTopFolder()
            } else {
                _set( f )
            }
        },
        [ _set, setTopFolder ]
    )

    const refresh = useCallback(
        ( lib: Library | undefined ) => {
            if ( lib ) {
                if ( folder && folder.id !== 'top' ) {
                    const found = findInLibrary( lib, folder.id )
                    set( found as FolderItem )
                } else {
                    _set( asFolder( lib, 'top' ))
                }
            }

            return lib
        },
        [ _set, folder, set ]
    )

    const goUp = useCallback(
        () => {
            const parent = find( folder?.parent )
            set( parent as FolderItem )
        },
        [ find, folder?.parent, set ]
    )

    const create = useCallback(
        async ( parent: FolderItem ) => {
            const created = await handlers.create( parent )

            if ( created ) {
                set( created )
            }
        },
        [ handlers, set ]
    )

    const remove = useCallback(
        async ( item: ListItem ) => {
            return refresh( await handlers.remove( item ))
        },
        [ handlers, refresh ]
    )

    const move = useCallback(
        async ( item: ListItem, target: string ) => {
            return refresh( await handlers.move( item, target ))
        },
        [ handlers, refresh ]
    )

    const moveUp = useCallback(
        async ( item: ListItem ) => {
            if ( folder?.parent ) {
                return refresh( await handlers.move( item, folder.parent ))
            }
        },
        [ folder?.parent, handlers, refresh ]
    )

    const append = useCallback(
        async ( files: string[]) => {
            return refresh( await handlers.append( files, folder?.id ?? 'top' ))
        },
        [ folder?.id, handlers, refresh ]
    )

    const resort = useCallback(
        async ( a: ListItem, b: ListItem ) => {
            return refresh( await handlers.resort( folder?.id ?? 'top', a, b ))
        },
        [ folder?.id, handlers, refresh ]
    )

    const sortLast = useCallback(
        async ( item: ListItem ) => {
            const list: ListItem[] | undefined = folder?.children ?? library

            if ( list ) {
                const sorted = list.sort(( a, b ) => ( a.weight ?? 0 ) - ( b.weight ?? 0 ))
                const last   = sorted[ sorted.length - 1 ]

                return refresh( await handlers.resort( folder?.id ?? 'top', item, last ))
            }

            return library
        },
        [ folder?.children, folder?.id, library, refresh, handlers ]
    )

    const waitUpdate = useCallback(
        ( id: string ) => {
            update({ waitUpdate: [ ...waitingUpdate, id ] })
        },
        [ waitingUpdate, update ]
    )

    const stopWaitingUpdate = useCallback(
        ( id: string ) => {
            const res = [ ...waitingUpdate ]

            res.splice( res.indexOf( id ), 1 )

            update({ waitUpdate: res })
        },
        [ waitingUpdate, update ]
    )

    const isWaiting = useCallback(
        ( data: ListItem ) => {
            return waitingUpdate.includes( data.id )
        },
        [ waitingUpdate ]
    )

    useEffect(
        () => {
            if ( !folder || folder.id === 'top' ) {
                setTopFolder()
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [ library ]
    )

    useEffect(
        () => {
            const watcher = async ([ _, what, id ]: string[]): Promise<void> => {
                if ( !loading && what === 'library' && waitingUpdate.includes( id )) {
                    const lib = await load()
                    refresh( lib )
                    stopWaitingUpdate( id )
                }
            }

            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            window.runtime.EventsOn( 'reload', watcher )

            return () => {
                window.runtime.EventsOff( 'reload' )
            }
        },
        [ loading, waitingUpdate, load, refresh, stopWaitingUpdate ]
    )

    return useHookResult({
        folder,
        items: items ?? [],
        refresh,
        resort,
        sortLast,
        append,
        move,
        create,
        remove,
        set,
        goUp,
        moveUp,
        waitUpdate,
        stopWaitingUpdate,
        isWaiting
    })
}
