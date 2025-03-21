import { ItemDataEditor } from 'src/@/segments/composition/ItemDataEditor'
import { IconEditor }     from 'src/@/segments/features/IconEditor'
import { Stack }          from 'src/@/shared/ui-kit/Stack'
import { VDivider }       from 'src/@/shared/ui-kit/VDivider'

export
function EditItemScreen
()
{
    return (
        <Stack>
            <IconEditor />
            <VDivider />
            <ItemDataEditor />
        </Stack>
    )
}
