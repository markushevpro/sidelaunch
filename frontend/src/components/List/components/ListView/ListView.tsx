import classNames      from 'classnames'
import { useCallback } from 'react'

import { Scrollable }     from 'components'
import { TFolder, TItem } from 'models'

import AddButton         from '../AddButton/AddButton'
import BackArrow         from '../BackArrow/BackArrow'
import { DraggableItem } from '../DraggableItem/DraggableItem'

import styles from './list.module.scss'

const List = ({ data }: { data: TFolder }) => {

    const
        moveItem = useCallback(( dragIndex: number, hoverIndex: number ) => {
            console.log( 'from', dragIndex, 'to', hoverIndex )
        }, [])

    return (
        <Scrollable>
            <ul className={styles.list}>
                <BackArrow className={classNames( styles.item, styles.backButton )} target={data.parent} />

                {
                    data.children.map(( item: TItem, index: number ) => (
                        <DraggableItem
                            key={item.id}
                            className={styles.item}
                            data={item}
                            index={index}
                            onMove={moveItem}
                        />
                    ))
                }

                <AddButton className={classNames( styles.item, styles.backButton )} />
            </ul>
        </Scrollable>
    )
}

export default List
