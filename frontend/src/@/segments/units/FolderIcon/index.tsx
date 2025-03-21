import { IconWithBadge }      from 'src/@/segments/units/IconWithBadge'
import { ImageVisibleOnLoad } from 'src/@/segments/units/ImageVisibleOnLoad'

import type { CSSProperties } from 'react'
import type { FolderItem }    from 'src/@/shared/types/items'

import styles            from './folder-icon.module.css'
import { useFolderIcon } from './hook'

interface PFolderIcon
{
    data: FolderItem
    size?: number
    onClick?: () => void
}

export
function FolderIcon
({ data, size: customSize, onClick }: PFolderIcon )
{
    const { icon, size } = useFolderIcon( data, customSize )

    return (
        <IconWithBadge
            center
            height={size}
            icon={icon.fallback}
            title={data.name}
            width={size}
            badge={(
                <ImageVisibleOnLoad
                    className={styles.icon}
                    src={icon.icon}
                    style={{ '--icon-size': `${size}px` } as CSSProperties}
                />
            )}
            onClick={onClick}
        />
    )
}
