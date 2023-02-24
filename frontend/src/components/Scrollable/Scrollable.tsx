
import Scrollbars from 'react-custom-scrollbars'

import { TWithChildren } from 'utils'

const Scrollable = ({ children }: TWithChildren ) => {
    return (
        <Scrollbars
            autoHide
            autoHideDuration={0}
            autoHideTimeout={500}
            height={window.innerHeight}
        >
            { children }
        </Scrollbars>
    )
}

export default Scrollable
