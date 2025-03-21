import { useCallback, useMemo, useState } from 'react'
import { FormField }                      from 'src/@/segments/composition/FormField'
import { useLibrary }                     from 'src/@/services/library/hook'
import { useAppView }                     from 'src/@/services/view/hook'
import { Button }                         from 'src/@/shared/ui-kit/Button'
import { Content }                        from 'src/@/shared/ui-kit/Content'
import { isFolder }                       from 'src/@/shared/utils/items'

import type { ChangeEvent } from 'react'
import type { AppItem }     from 'src/@/shared/types/items'

export
function ItemDataEditor
()
{
    const { updateItem } = useLibrary()
    const { item }       = useAppView()
    const appItem        = item as AppItem

    const folder = useMemo(() => item && isFolder( item ), [ item ])

    const [ loading, $loading ] = useState<boolean>( false )

    const [ name, $name ]     = useState<string | undefined>( item?.name )
    const [ path, $path ]     = useState<string | undefined>( appItem?.path )
    const [ dir, $dir ]       = useState<string | undefined>( appItem?.dir )
    const [ params, $params ] = useState<string | undefined>( appItem?.params )

    const updated = useMemo(
        () => (
            item && (
                name !== item?.name ||
                path !== appItem?.path ||
                dir !== appItem?.dir ||
                params !== appItem?.params
            )
        ),
        [ item, name, path, appItem?.path, appItem?.dir, appItem?.params, dir, params ]
    )

    const update = useCallback(
        ( setter: ( val: string ) => void ) => ( e: ChangeEvent<HTMLInputElement> ) => {
            setter( e.target.value )
        },
        []
    )

    const save = useCallback(
        async () => {
            if ( item && updated ) {
                $loading( true )

                if ( isFolder( item )) {
                    await updateItem( item, { name })
                } else {
                    await updateItem(
                        item as AppItem,
                        {
                            name,
                            path,
                            dir,
                            params
                        }
                    )
                }

                $loading( false )
                window.runtime.Quit()
            }
        },
        [ dir, item, name, params, path, updateItem, updated ]
    )

    if ( !item ) {
        return null
    }

    return (
        <Content fill>
            <FormField label="ID">
                <input
                    disabled
                    readOnly
                    type="text"
                    value={item.id}
                />
            </FormField>

            <FormField label="Name">
                <input
                    disabled={loading}
                    type="text"
                    value={name}
                    onChange={update( $name )}
                />
            </FormField>

            {
                !folder && (
                    <>
                        <FormField label="Path">
                            <input
                                disabled={loading}
                                type="text"
                                value={path}
                                onChange={update( $path )}
                            />
                        </FormField>

                        <FormField label="Working directory">
                            <input
                                disabled={loading}
                                type="text"
                                value={dir}
                                onChange={update( $dir )}
                            />
                        </FormField>

                        <FormField label="Arguments">
                            <input
                                disabled={loading}
                                type="text"
                                value={params}
                                onChange={update( $params )}
                            />
                        </FormField>
                    </>
                )
            }

            <Button disabled={!updated || loading} onClick={save}>
                Save
            </Button>
        </Content>
    )
}
