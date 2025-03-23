import { Button }  from 'src/@/shared/ui-kit/Button'
import { Content } from 'src/@/shared/ui-kit/Content'
import { Stack }   from 'src/@/shared/ui-kit/Stack'

import { AppItemFields }     from './AppItemFields'
import { SharedItemFields }  from './SharedItemFields'
import { useItemDataEditor } from './hook'

export
function ItemDataEditor
()
{
    const { item, loading, changed, updaters, updated, isApp, save, cancel } = useItemDataEditor()

    if ( !item ) {
        return null
    }

    return (
        <Content fill>
            <SharedItemFields
                item={item}
                loading={loading}
                values={ changed }
                onChange={ updaters }
            />

            {
                isApp && (
                    <AppItemFields
                        loading={loading}
                        values={changed}
                        onChange={updaters}
                    />
                )
            }

            <Stack align="end" gap={8}>
                <Button ghost onClick={cancel}>
                    Cancel
                </Button>

                <Button disabled={!updated || loading} onClick={save}>
                    Save
                </Button>
            </Stack>
        </Content>
    )
}
