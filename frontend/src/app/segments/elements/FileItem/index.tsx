import classNames                      from 'classnames'
import { useCallback, type ReactNode } from 'react'
import { run }                         from 'src/app/shared/utils/fs'

import type { IItem } from 'src/app/shared/types/items'

export
interface PFileItem
{
    data: IItem,
    size?: number,
    className?: string
}

export
function FileItem
({ data, className }: PFileItem ): ReactNode
{
    const size = 32 // useConfig( 'iconSize' ) || 32,

    const runItem = useCallback(
        () => { run( data ) },
        [ data ]
    )

    const showMenu = useCallback(
        () => {
            // window.backend.ui.itemMenu( JSON.stringify( data ))
        },
        []
    )

    return (
        <li className={classNames( 'list-item', className )} onClick={runItem} onContextMenu={showMenu}>
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
