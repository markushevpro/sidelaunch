import { PlusOutlined } from '@ant-design/icons'
import classNames       from 'classnames'

import store, { StoreActions } from 'store'
import { TWithClassName }      from 'utils'

const AddButton = ({ className }: TWithClassName ) => {
    const
        onAdd = async () => {
            const folder = await StoreActions.addFolder( 'New folder' )
            store.set( folder )
        }

    return (
        <li className={classNames( 'center-container', className )} onClick={onAdd}>
            <PlusOutlined />
        </li>
    )
}

export default AddButton
