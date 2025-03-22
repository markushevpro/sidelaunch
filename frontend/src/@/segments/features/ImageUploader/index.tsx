import { Center }       from 'src/@/shared/ui-kit/Center'
import { FileUploader } from 'src/@/shared/ui-kit/FileUploader'

import type { ReactNode } from 'react'

import { useImageUploader } from './hook'
import styles               from './image-uploader.module.css'

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
    const { before } = useImageUploader( id, onDone )

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
