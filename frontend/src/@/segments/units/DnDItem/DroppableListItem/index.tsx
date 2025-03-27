import cn from 'classnames'

import { AllowDrop } from 'src/@/segments/units/AllowDrop'

import type { PropsWithChildren } from 'react'
import type { ListItem }          from 'src/@/shared/types/items'
import type { DivProps }          from 'src/@/shared/types/props'

import { useDroppableListItem } from './hook'

interface PDroppableListItem
extends
PropsWithChildren,
DivProps
{
    data: ListItem
}

export
function DroppableListItem
({ data, children, className, ...rest }: PDroppableListItem )
{
    const { classNames, onDrop, onHover } = useDroppableListItem( data )

    return (
        <AllowDrop
            {...rest}
            className={cn( className, classNames )}
            data={data}
            onDrop={onDrop}
            onHover={onHover}
        >
            { children }
        </AllowDrop>
    )
}
