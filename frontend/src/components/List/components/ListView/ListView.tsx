import classNames from 'classnames'

import { Scrollable } from 'components'
import { TFolder }    from 'models'

import AddButton from '../AddButton/AddButton'
import BackArrow from '../BackArrow/BackArrow'
import ListItem  from '../ListItem/ListItem'

import styles from './list.module.scss'

const List = ({ data }: { data: TFolder }) => {

    return (
        <Scrollable>
            <ul className={styles.list}>
                <BackArrow className={classNames( styles.item, styles.backButton )} target={data.parent} />

                {
                    data.children.map( item => (
                        <ListItem
                            key={item.id}
                            className={styles.item}
                            data={item}
                        />
                    ))
                }

                <AddButton className={classNames( styles.item, styles.backButton )} />
            </ul>
        </Scrollable>
    )
}

export default List
