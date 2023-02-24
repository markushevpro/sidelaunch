import { ArrowLeftOutlined } from '@ant-design/icons'
import classnames            from 'classnames'

import { TFolder } from 'models'
import store       from 'store'

interface TBackArrowProps {
    target?: string,
    className: string
}

const BackArrow = ({ className, target }: TBackArrowProps ) => {
    const
        goBack = () => {
            store.set( store.get( target ) as TFolder )
        }

    if ( !target ) { return null }

    return (
        <li className={classnames( 'center-container', className )} onClick={goBack}>
            <ArrowLeftOutlined />
        </li>
    )
}

export default BackArrow
