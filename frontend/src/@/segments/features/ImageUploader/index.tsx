import { useCallback }    from 'react'
import { Center }         from 'src/@/shared/ui-kit/Center'
import { FileUploader }   from 'src/@/shared/ui-kit/FileUploader'
import { getBase64Image } from 'src/@/shared/utils/images'
import { SaveIcon }       from 'wailsjs/go/main/App'

import type { ReactNode } from 'react'

import styles from './image-uploader.module.css'

interface PImageUploader
{
    id: string
    image: string
    content?: ReactNode
    onDone?: () => void
}

export
function ImageUploader
({ id, image, content, onDone }: PImageUploader )
{
    const before = useCallback(
        async ( file: File ) => {
            const data = await getBase64Image( file )
            await SaveIcon( id, data )
            onDone?.()
            return false
        },
        [ id, onDone ]
    )

    return (
        <div className={styles.container}>
            <FileUploader accept="image/jpeg,image/png" beforeUpload={before}>
                <Center>
                    {
                        content ?? (
                            <img className={styles.icon} src={image} />
                        )
                    }
                </Center>
            </FileUploader>

            <div className={styles.overlay}>
                <Center>
                    Replace
                </Center>
            </div>
        </div>
    )
}
