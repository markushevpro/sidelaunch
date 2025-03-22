import { SmartItem }        from 'src/@/segments/features/SmartItem'
import { ItemSizeProvider } from 'src/@/segments/units/ItemSizeProvider'

import { useCurrentFolderItems } from './hook'

export
function CurrentFolderItems
()
{
    const { classNames, checkUpdate, items } = useCurrentFolderItems()

    return (
        <ItemSizeProvider>
            <ul className={classNames} onMouseMove={checkUpdate}>
                {
                    items.map( item => (
                        <SmartItem key={item.id} data={item} />
                    ))
                }
            </ul>
        </ItemSizeProvider>
    )
}
