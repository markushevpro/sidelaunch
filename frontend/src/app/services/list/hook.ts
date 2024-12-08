import { useCallback, useEffect, useMemo } from 'react'
import { useAppStore }                     from 'src/app/services/store/store'
import { isFolder }                        from 'src/app/shared/utils/fs'

import type { IFolder, IItem } from 'src/app/shared/types/items'

import { sortHandler } from './helpers'

interface HList
{
    data?: IFolder
    items: IItem[]
    hovered: string | undefined
    dragged: string | undefined
    moveItem: ( dragItem: IItem, hoverItem: IItem ) => void
    dropItem: ( from: IItem, to: IItem ) => void
}

export
function useList
(): HList
{
    const { data, hovered, dragged, items, update } = useAppStore()

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
                const copy      = [ ...items ].sort( sortHandler )
                const fromIndex = copy.findIndex(( item: IItem ) => item.id === from.id )
                const toIndex   = copy.findIndex(( item: IItem ) => item.id === to.id )

                copy.splice( fromIndex, 1 )
                copy.splice( toIndex, 0, from )

                copy.forEach(( item: IItem, index: number ) => { item.weight = index })

                update({ items: copy })
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
            update({ items: data?.children.sort( sortHandler ) })
        },
        [ data, update ]
    )

    return useMemo(
        () => ({
            data,
            items: items ?? [],
            hovered,
            dragged,
            moveItem,
            dropItem
        }),
        [ data, dragged, dropItem, hovered, items, moveItem ]
    )
}
