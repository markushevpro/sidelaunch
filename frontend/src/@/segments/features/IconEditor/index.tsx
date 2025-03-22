import { ImageUploader } from 'src/@/segments/features/ImageUploader'
import { Content }       from 'src/@/shared/ui-kit/Content'

import { useIconEditor } from './hook'
import styles            from './icon-editor.module.css'

export
function IconEditor
()
{
    const { id, folder, icon, force } = useIconEditor()

    return (
        <Content className={styles.container}>
            <ImageUploader
                content={folder}
                id={id}
                image={icon}
                onDone={force}
            />
        </Content>
    )
}
