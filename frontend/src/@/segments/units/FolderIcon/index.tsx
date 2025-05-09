import { IconWithBadge }    from 'src/@/segments/units/IconWithBadge'
import { ImageHideOnError } from 'src/@/segments/units/ImageHideOnError'

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
    const { loading, icon, size } = useFolderIcon( data, customSize )

    return (
        <IconWithBadge
            center
            height={size}
            icon={icon.fallback}
            loading={loading}
            title={data.name}
            width={size}
            badge={(
                <ImageHideOnError
                    className={styles.icon}
                    src={icon.icon}
                    style={{ '--icon-size': `${size}px` } as CSSProperties}
                />
            )}
            onClick={onClick}
        />
    )
}
