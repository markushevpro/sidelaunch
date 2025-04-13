import { Button }  from 'src/@/shared/ui-kit/Button'
import { Content } from 'src/@/shared/ui-kit/Content'
import { Spinner } from 'src/@/shared/ui-kit/Spinner'
import { Stack }   from 'src/@/shared/ui-kit/Stack'

import { AppItemFields }     from './AppItemFields'
import { SharedItemFields }  from './SharedItemFields'
import { useItemDataEditor } from './hook'

// TODO: Use ChangedProvider

export
function ItemDataEditor
()
{
    const { item, loading, canSave, changed, updaters, updated, isApp, isUrl, save, cancel } = useItemDataEditor()

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
                        isUrl={isUrl}
                        loading={loading}
                        values={changed}
                        onChange={updaters}
                    />
                )
            }

            <Stack align="end" gap={8}>
                <Button ghost disabled={loading} onClick={cancel}>
                    Cancel
                </Button>

                <Button disabled={!updated || !canSave || loading} onClick={save}>
                    {
                        loading
                            ? <Spinner />
                            : 'Save'
                    }
                </Button>
            </Stack>
        </Content>
    )
}
