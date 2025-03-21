import { useEffect }    from 'react'
import { EditItemFlow } from 'src/@/flows/EditItem'
import { useLibrary }   from 'src/@/services/library/hook'
import { useAppView }   from 'src/@/services/view/hook'
import { Content }      from 'src/@/shared/ui-kit/Content'
import { usePageData }  from 'src/@/shared/utils/routes'

export
function EditWindow
()
{
    const { id }           = usePageData()
    const { find }         = useLibrary()
    const { item, update } = useAppView()

    useEffect(
        () => {
            if ( !item && id ) {
                update({
                    view: 'edit',
                    item: find( id )
                })
            }
        },
        [ find, id, item, update ]
    )

    useEffect(
        () => {
            if ( item?.name ) {
                document.title = `Edit ${item.name}`
            }
        },
        [ item?.name ]
    )

    if ( !item ) {
        return null
    }

    return (
        <Content>
            <EditItemFlow />
        </Content>
    )
}
