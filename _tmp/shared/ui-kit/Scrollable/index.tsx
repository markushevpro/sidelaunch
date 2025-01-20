import Scrollbars from 'react-custom-scrollbars'

import type { PropsWithChildren } from 'react'

export
function Scrollable
({ children }: PropsWithChildren )
{
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
