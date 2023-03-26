import { ArrowLeftOutlined } from '@ant-design/icons'
import classnames            from 'classnames'

import store from 'store'

interface TBackArrowProps {
    target?: string,
    className?: string
}

const BackArrow = ({ className, target }: TBackArrowProps ) => {
    const
        goBack = () => {
            store.set( target ?? 'top' )
        }

    if ( !target ) { return null }

    return (
        <li className={classnames( 'center-container', className )} onClick={goBack}>
            <ArrowLeftOutlined />
        </li>
    )
}

export default BackArrow
