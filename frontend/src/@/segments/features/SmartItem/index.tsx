import { DnDItem }            from 'src/@/segments/units/DnDItem'
import { ItemView }           from 'src/@/segments/units/ItemView'
import { RightClickProvider } from 'src/@/segments/units/RightClickProvider'

import type { ListItem } from 'src/@/shared/types/items'

import { useSmartItem } from './hook'

interface PSmartItem
{
    data: ListItem
}

export
function SmartItem
({ data }: PSmartItem )
{
    const { edit } = useSmartItem( data )

    return (
        <DnDItem data={data}>
            <RightClickProvider action={edit}>
                <ItemView data={data} />
            </RightClickProvider>
        </DnDItem>
    )
}
