import { useMemo }       from 'react'
import { ImageUploader } from 'src/@/segments/features/ImageUploader'
import { FolderIcon }    from 'src/@/segments/units/FolderIcon'
import { useIcon }       from 'src/@/services/icon/hook'
import { useAppView }    from 'src/@/services/view/hook'
import { Content }       from 'src/@/shared/ui-kit/Content'
import { isFolder }      from 'src/@/shared/utils/items'

import type { FolderItem } from 'src/@/shared/types/items'

export
function IconEditor
()
{
    const { item }        = useAppView()
    const { icon, force } = useIcon( item )

    const folder = useMemo(() => item && isFolder( item ), [ item ])

    return (
        <Content
            style={{
                width:     230,
                alignSelf: 'stretch'
            }}
        >
            <ImageUploader
                content={( item && folder ) ? <FolderIcon data={item as FolderItem} size={64} /> : undefined}
                id={item?.id ?? ''}
                image={icon}
                onDone={force}
            />
        </Content>
    )
}
