import { Button } from 'src/@/shared/ui-kit/Button'
import { Stack }  from 'src/@/shared/ui-kit/Stack'

import { useRemoveFolderButtons } from './hook'

export
function RemoveFolderButtons
()
{
    const { remove, saveChildren, cancel } = useRemoveFolderButtons()

    return (
        <Stack gap={16}>
            <Button alert onClick={remove}>
                Remove with children
            </Button>

            <Button onClick={saveChildren}>
                Move children to parent
            </Button>

            <Button ghost onClick={cancel}>
                Cancel removement
            </Button>
        </Stack>
    )
}
