import cn                from 'classnames'
import { DroppableItem } from 'src/app/segments/elements/DroppableItem'
import { useList }       from 'src/app/services/list/hook'

import type { ReactNode } from 'react'
import type { IItem }     from 'src/app/shared/types/items'

import { BackArrow } from './BackArrow'
import styles        from './back-button.module.css'

interface PBackButton
{
    className?: string
}

export
function BackButton
({ className }: PBackButton ): ReactNode
{
    const { data, hovered, moveItem, dropItem } = useList()

    return (
        <DroppableItem
            className={cn( className, styles.button, hovered === 'back' && styles.hovered )}
            data={{ id: 'back' } as IItem }
            hidden={!data?.parent}
            onDrop={dropItem}
            onMove={moveItem}
        >
            <BackArrow target={data?.parent} />
        </DroppableItem>
    )
}
