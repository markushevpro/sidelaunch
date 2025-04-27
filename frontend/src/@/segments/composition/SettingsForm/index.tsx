import { Button }   from 'src/@/shared/ui-kit/Button'
import { Fill }     from 'src/@/shared/ui-kit/Fill'
import { HDivider } from 'src/@/shared/ui-kit/HDivider'

import type { ChangedProps } from 'src/@/segments/units/ChangedProvider/types'
import type { AppConfig }    from 'src/@/shared/types/items'

import { HideSettings }    from './HideSettings'
import { IconSizeSetting } from './IconSizeSetting'
import { useSettingsForm } from './hook'
import styles              from './settings-form.module.css'

type PSettingsForm = ChangedProps<AppConfig>

export
function SettingsForm
({ data, changed, onChange }: PSettingsForm )
{
    const { loading, save } = useSettingsForm( data )

    return (
        <>
            <Fill className={styles.container}>
                <HideSettings changed={changed} data={data} onChange={onChange} />
                <IconSizeSetting value={data.iconSize} onChange={onChange( 'iconSize' )} />
            </Fill>

            <HDivider />

            <Button disabled={!changed || loading} onClick={save}>
                Save
            </Button>
        </>
    )
}
