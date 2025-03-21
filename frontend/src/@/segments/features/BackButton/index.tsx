import { AllowDrop }  from 'src/@/segments/units/AllowDrop'
import { ListButton } from 'src/@/segments/units/ListButton'
import { BackArrow }  from 'src/@/shared/ui-kit/icons/BackArrow'

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
            <ListButton onClick={onClick}>
                <BackArrow />
            </ListButton>
        </AllowDrop>
    )
}
