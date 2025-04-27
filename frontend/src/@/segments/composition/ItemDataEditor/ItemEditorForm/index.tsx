import { Button }  from 'src/@/shared/ui-kit/Button'
import { Content } from 'src/@/shared/ui-kit/Content'
import { Spinner } from 'src/@/shared/ui-kit/Spinner'
import { Stack }   from 'src/@/shared/ui-kit/Stack'
import { Visible } from 'src/@/shared/ui-kit/Visible'

import type { ChangedProps }      from 'src/@/segments/units/ChangedProvider/types'
import type { AppItem, ListItem } from 'src/@/shared/types/items'

import { AppItemFields }     from './AppItemFields'
import { SharedItemFields }  from './SharedItemFields'
import { useItemEditorForm } from './hook'

type PItemEditorForm = ChangedProps<ListItem>

export
function ItemEditorForm
({ data, changed, onChange }: PItemEditorForm )
{
    const { loading, canSave, isApp, isUrl, save, cancel } = useItemEditorForm( data, changed )

    return (
        <Content fill>
            <SharedItemFields
                changed={changed}
                data={data}
                loading={loading}
                onChange={onChange}
            />

            <Visible If={isApp}>
                <AppItemFields
                    changed={changed}
                    data={data as AppItem}
                    isUrl={isUrl}
                    loading={loading}
                    onChange={onChange}
                />
            </Visible>

            <Stack align="end" gap={8}>
                <Button ghost disabled={loading} onClick={cancel}>
                    Cancel
                </Button>

                <Button disabled={!changed || !canSave || loading} onClick={save}>
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
