import { useCallback, useEffect, useMemo } from 'react'
import { useLibrary }                      from 'src/@/services/library/hook'
import { isFolder }                        from 'src/@/shared/utils/fs'

import type { IFolder, IItem } from 'src/@/shared/types/items'

import { asTopFolder, resortItems } from './helpers'
import { useFolderStore }           from './store'

interface HFolder
{
    folder?: IFolder
    items: IItem[]
    hovered: string | undefined
    dragged: string | undefined
    moveItem: ( dragItem: IItem, hoverItem: IItem ) => void
    dropItem: ( from: IItem, to: IItem ) => void
}

export
function useFolder
(): HFolder
{
    const { library } = useLibrary()

    const { folder, hovered, dragged, items, update } = useFolderStore()

    const moveItem = useCallback(
        ( dragItem: IItem, hoverItem: IItem ) => {
            if ( dragItem.id === hoverItem.id ) {
                update({ hovered: undefined })
                return
            }

            update({
                hovered: hoverItem?.id,
                dragged: dragItem?.id
            })
        },
        [ update ]
    )

    const moveUp = useCallback(
        ( from: IItem ) => {
            // const target = store.get( from.parent )
            console.log( 'move up', from )
            // store.move( target.parent || 'top', from )
        },
        []
    )

    const dropToFolder = useCallback(
        ( from: IItem, to: IItem ) => {
            // store.move( to.id, from )
        },
        []
    )

    const changeSorting = useCallback(
        ( from: IItem, to: IItem ) => {
            if ( items ) {
                update({ items: resortItems( items, from, to ) })
            }
        },
        [ items, update ]
    )

    const dropItem = useCallback(
        ( from: IItem, to: IItem ) => {
            update({ hovered: undefined })

            if ( to.id === 'back' ) {
                moveUp( from )
            } else if ( isFolder( to )) {
                dropToFolder( from, to )
            } else {
                changeSorting( from, to )
            }
        },
        [ changeSorting, dropToFolder, moveUp, update ]
    )

    useEffect(
        () => {
            if ( library && !folder ) {
                update({ folder: asTopFolder( library ) })
            }

            if ( !folder?.children ) {
                // update({ items: folder?.children.sort( sortHandler ) })
            }
        },
        [ folder, folder?.children, library, update ]
    )

    return useMemo(
        () => ({
            folder,
            items: items ?? [],
            hovered,
            dragged,
            moveItem,
            dropItem
        }),
        [ dragged, dropItem, folder, hovered, items, moveItem ]
    )
}
