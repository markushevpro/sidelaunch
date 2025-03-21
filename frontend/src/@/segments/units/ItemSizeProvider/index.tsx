import { TARGET_WINDOW_SIZE } from 'src/@/services/window/const'

import type { CSSProperties, PropsWithChildren } from 'react'

export
function ItemSizeProvider
({ children }: PropsWithChildren )
{
    return (
        <div style={{ '--item-size': TARGET_WINDOW_SIZE + 'px' } as CSSProperties}>
            { children }
        </div>
    )
}
