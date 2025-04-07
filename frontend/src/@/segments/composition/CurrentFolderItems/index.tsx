import { LastPlace }        from 'src/@/segments/features/LastPlace'
import { SmartItem }        from 'src/@/segments/features/SmartItem'
import { ItemSizeProvider } from 'src/@/segments/units/ItemSizeProvider'

import { useCurrentFolderItems } from './hook'

export
function CurrentFolderItems
()
{
    const { classNames, items } = useCurrentFolderItems()

    return (
        <ItemSizeProvider>
            <ul className={classNames}>
                {
                    items.map( item => (
                        <SmartItem key={item.id} data={item} />
                    ))
                }

                <LastPlace />
            </ul>
        </ItemSizeProvider>
    )
}
