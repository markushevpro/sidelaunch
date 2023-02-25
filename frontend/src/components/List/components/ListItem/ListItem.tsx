import { TItem }     from 'models'
import { useConfig } from 'store'
import { run }       from 'utils'

export type IListItemProps = {
    data: TItem,
    size?: number,
    className?: string
}


const ListItem = ({ data, className }: IListItemProps ) => {
    const
        size = useConfig( 'iconSize' ) || 32,
        runItem = () => run( data ),
        showMenu = () => window.backend.ui.itemMenu( JSON.stringify( data ))

    return (
        <li className={className} onClick={runItem} onContextMenu={showMenu}>
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

export default ListItem
