import { AllowDrop } from 'src/@/segments/features/AllowDrop'
import { IconItem }  from 'src/@/segments/units/IconItem'

import type { ListItem } from 'src/@/shared/types/items'

import { useBackButton } from './hook'

export
function BackButton
()
{
    const { visible, onDrop, onClick } = useBackButton()

    if ( !visible ) {
        return null
    }

    return (
        <AllowDrop
            data={{ id: 'back' } as ListItem }
            onDrop={onDrop}
            // onHover={unknownAction}
        >
            <IconItem onClick={onClick}>
                &lt;-
            </IconItem>
        </AllowDrop>
    )
}
