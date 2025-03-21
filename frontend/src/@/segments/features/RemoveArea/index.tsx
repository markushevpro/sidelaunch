import cn             from 'classnames'
import { AllowDrop }  from 'src/@/segments/units/AllowDrop'
import { ListButton } from 'src/@/segments/units/ListButton'
import { Trash }      from 'src/@/shared/ui-kit/icons/Trash'

import { useRemoveArea } from './hook'
import styles            from './remove-area.module.css'

export
function RemoveArea
()
{
    const { visible, drop } = useRemoveArea()

    return (
        <AllowDrop
            data={{ id: 'remove' }}
            onDrop={drop}
        >
            <ListButton className={cn( styles.area, visible && styles.visible )}>
                <Trash />
            </ListButton>
        </AllowDrop>
    )
}
