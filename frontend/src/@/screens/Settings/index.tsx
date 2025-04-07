import { SettingsForm }    from 'src/@/segments/composition/SettingsForm'
import { ChangedProvider } from 'src/@/segments/units/ChangedProvider'
import { useConfig }       from 'src/@/services/config/hook'

export
function SettingsScreen
()
{
    const { config } = useConfig()

    if ( !config ) {
        return null
    }

    return (
        <ChangedProvider component={SettingsForm} initial={config} />
    )
}
