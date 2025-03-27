import cn from 'classnames'

import { AllowDrop }  from 'src/@/segments/units/AllowDrop'
import { ListButton } from 'src/@/segments/units/ListButton'
import { BackArrow }  from 'src/@/shared/ui-kit/icons/BackArrow'

import type { ListItem } from 'src/@/shared/types/items'

import styles            from './back-button.module.css'
import { useBackButton } from './hook'

export
function BackButton
()
{
    const { visible, hovered, onHover, onDrop, onClick } = useBackButton()

    if ( !visible ) {
        return null
    }

    return (
        <AllowDrop
            className={cn( hovered && styles.hover )}
            data={{ id: 'back' } as ListItem }
            onDrop={onDrop}
            onHover={onHover}
        >
            <ListButton onClick={onClick}>
                <BackArrow />
            </ListButton>
        </AllowDrop>
    )
}
