import { SettingsFlow } from 'src/@/flows/Settings'
import { Content }      from 'src/@/shared/ui-kit/Content'

export
function SettingsWindow
()
{
    return (
        <Content fill>
            <SettingsFlow />
        </Content>
    )
}
