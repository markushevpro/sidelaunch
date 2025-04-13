import { ImageHideOnError } from 'src/@/segments/units/ImageHideOnError'
import { Center }           from 'src/@/shared/ui-kit/Center'
import { FileUploader }     from 'src/@/shared/ui-kit/FileUploader'

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
    const { open } = useImageUploader( id, onDone )

    return (
        <div className={styles.container}>
            <FileUploader accept=".exe,image/vnd.microsoft.icon,image/jpeg,image/png" onClick={open}>
                <Center>
                    {
                        content ?? (
                            <ImageHideOnError className={styles.icon} src={image} />
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
