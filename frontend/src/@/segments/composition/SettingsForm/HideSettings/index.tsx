import type { ChangedProps } from 'src/@/segments/units/ChangedProvider/types'
import type { AppConfig }    from 'src/@/shared/types/items'

import { FixedToggle }        from './FixedToggle'
import { HideTimeoutSetting } from './HideTimeoutSetting'

export
function HideSettings
({ data, onChange }: ChangedProps<AppConfig> )
{
    return (
        <>
            <FixedToggle checked={!!data.fixed} onChange={onChange( 'fixed' )} />

            {
                ( !data.fixed ) && (
                    <HideTimeoutSetting value={data.hideTimeout} onChange={onChange( 'hideTimeout' )} />
                )
            }
        </>
    )
}
