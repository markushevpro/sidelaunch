import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons'
import classnames                          from 'classnames'
import Scrollbars                          from 'react-custom-scrollbars'

import { TFolder, TItem } from 'models'
import { useConfig }      from 'service'
import { isItem }         from 'utils'

import styles from './list.module.scss'


type IListProps = {
    data: Array<TFolder | TItem>,
    onItemClick: ( data: TFolder | TItem ) => void,
    onMenu: ( data: TFolder | TItem ) => void,
    onBack?: () => void,
    onAdd: () => void
}

type IListItemProps = {
    data: TFolder | TItem,
    size?: number,
    onClick: ( data: TFolder | TItem ) => void,
    onMenu: ( data: TFolder | TItem ) => void
}

const ListItem = ({ data, size, onClick, onMenu }: IListItemProps ) => {
    return (
        <li className={styles.item} onClick={() => onClick( data )} onContextMenu={() => onMenu( data )}>
            <img
                draggable={false}
                height={size}
                src={data.icon}
                title={data.name}
                width={size}
            />
        </li>
    )
}

const List = ({ data, onBack, onItemClick, onMenu, onAdd }: IListProps ) => {
    const
        iconSize = useConfig( 'iconSize' )

    return (
        <Scrollbars
            autoHide
            autoHideDuration={0}
            autoHideTimeout={500}
            height={window.innerHeight}
        >
            <ul className={styles.list}>
                {
                    onBack && (
                        <li className={classnames( 'center-container', styles.item, styles.backButton )} onClick={onBack}>
                            <ArrowLeftOutlined />
                        </li>
                    )
                }

                {
                    data.map( item => (
                        <ListItem
                            key={`${isItem( item ) ? 'item' : 'folder'}-${item.id}`}
                            data={item}
                            size={+iconSize}
                            onClick={onItemClick}
                            onMenu={onMenu}
                        />
                    ))
                }

                <li className={classnames( 'center-container', styles.item, styles.backButton )} onClick={onAdd}>
                    <PlusOutlined />
                </li>
            </ul>
        </Scrollbars>
    )
}

export default List
