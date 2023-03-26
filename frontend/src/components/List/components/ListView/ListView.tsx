import classNames                           from 'classnames'
import classnames                           from 'classnames'
import { useCallback, useEffect, useState } from 'react'

import { Scrollable }     from 'components'
import { TFolder, TItem } from 'models'
import store              from 'store'
import { isFolder }       from 'utils'

import AddButton         from '../AddButton/AddButton'
import BackArrow         from '../BackArrow/BackArrow'
import { DraggableItem } from '../DraggableItem/DraggableItem'
import { DroppableItem } from '../DroppableItem/DroppableItem'
import ListItem          from '../ListItem/ListItem'

import styles from './list.module.scss'

const List = ({ data }: { data: TFolder }) => {

    const
        sortHandler = ( a: TItem, b: TItem ) => {
            if ( isFolder( a ) && !isFolder( b )) {
                return -1
            }

            if ( isFolder( b ) && !isFolder( a )) {
                return 1
            }

            return a.weight - b.weight
        },
        sorted = useCallback(() => data?.children.sort( sortHandler ), [ data ]),

        [ hovered, $hovered ] = useState<string | undefined>( void 0 ),
        [ dragged, $dragged ] = useState<string | undefined>( void 0 ),
        [ items, $items ] = useState( sorted()),

        moveItem = ( dragItem: TItem, hoverItem: TItem ) => {
            if ( dragItem.id === hoverItem.id ) {
                $hovered( void 0 )
                return
            }
            $hovered( hoverItem?.id )
            $dragged( dragItem?.id )
        },

        dropItem = ( from: TItem, to: TItem ) => {

            $hovered( void 0 )

            if ( to.id === 'back' ) {
                moveUp( from )
            } else if ( isFolder( to )) {
                dropToFolder( from, to )
            } else {
                changeSorting( from, to )
            }
        },

        moveUp = ( from: TItem ) => {
            const target = store.get( from.parent )
            console.log( 'move up', from )
            store.move( target.parent || 'top', from )
        },

        dropToFolder = ( from: TItem, to: TItem ) => {
            store.move( to.id, from )
        },

        changeSorting = ( from: TItem, to: TItem ) => {
            const
                copy = [ ...items ].sort( sortHandler ),
                fromIndex = copy.findIndex(( item: TItem ) => item.id === from.id ),
                toIndex = copy.findIndex(( item: TItem ) => item.id === to.id )

            copy.splice( fromIndex, 1 )
            copy.splice( toIndex, 0, from )

            copy.forEach(( item: TItem, index: number ) => item.weight = index )

            $items( copy )
        }

    useEffect(() => {
        $items( sorted())
    }, [ data ])

    return (
        <Scrollable>
            <ul className={styles.list}>
                <DroppableItem
                    className={classNames( styles.item, styles.backButton, hovered === 'back' && styles.hovered )}
                    data={{ id: 'back' } as TItem }
                    hidden={!data.parent}
                    onDrop={dropItem}
                    onMove={moveItem}
                >
                    <BackArrow target={data.parent} />
                </DroppableItem>

                {
                    items.map(( item: TItem ) => (
                        <DroppableItem
                            key={item.id}
                            className={classnames( styles.item, isFolder( item ) && styles.folder, hovered === item.id && styles.hovered, dragged === item.id && styles.dragged )}
                            data={item}
                            onDrop={dropItem}
                            onMove={moveItem}
                        >
                            <DraggableItem
                                data={item}
                            >
                                <ListItem
                                    data={item}
                                />
                            </DraggableItem>
                        </DroppableItem>
                    ))
                }

                <AddButton className={classNames( styles.item, styles.addButton )} />
            </ul>
        </Scrollable>
    )
}

export default List
