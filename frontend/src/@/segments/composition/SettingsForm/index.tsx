import { useCallback, useState } from 'react'

import { useConfig }          from 'src/@/services/config/hook'
import { Button }             from 'src/@/shared/ui-kit/Button'
import { Fill }               from 'src/@/shared/ui-kit/Fill'
import { HDivider }           from 'src/@/shared/ui-kit/HDivider'
import { Reload, SaveConfig } from 'wailsjs/go/main/App'

import type { ChangedProps } from 'src/@/segments/units/ChangedProvider/types'
import type { AppConfig }    from 'src/@/shared/types/items'

import { HideSettings }    from './HideSettings'
import { IconSizeSetting } from './IconSizeSetting'
import styles              from './settings-form.module.css'

type PSettingsForm = ChangedProps<AppConfig>

export
function SettingsForm
({ data, changed, onChange }: PSettingsForm )
{
    const { load } = useConfig()

    const [ loading, $loading ] = useState<boolean>( false )

    const save = useCallback(
        async () => {
            $loading( true )

            await SaveConfig( JSON.stringify( data ))
            await load()
            await Reload( 'config', '' )

            if ( data.fixed ) {
                await Reload( 'show', '' )
            } else {
                await Reload( 'hide', '' )
            }

            $loading( false )
            window.runtime.Quit()
        },
        [ data, load ]
    )

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
