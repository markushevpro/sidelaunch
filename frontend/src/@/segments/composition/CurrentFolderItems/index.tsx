import { SmartItem }        from 'src/@/segments/features/SmartItem'
import { useCurrentFolder } from 'src/@/services/folder/hook'

export
function CurrentFolderItems
()
{
    const { items } = useCurrentFolder()

    console.log({ items })

    return (
        <ul>
            {
                items.map( item => (
                    <SmartItem key={item.id} data={item} />
                ))
            }
        </ul>
    )
}
