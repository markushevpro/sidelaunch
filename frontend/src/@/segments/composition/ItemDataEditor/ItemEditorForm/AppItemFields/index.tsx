import { FormField }         from 'src/@/segments/composition/FormField'
import { Button }            from 'src/@/shared/ui-kit/Button'
import { ExternalIcon }      from 'src/@/shared/ui-kit/icons/External'
import { getValueFromInput } from 'src/@/shared/utils/inputs'

import type { ChangedProps } from 'src/@/segments/units/ChangedProvider/types'
import type { AppItem }      from 'src/@/shared/types/items'

import { ProtocolError }    from './ProtocolError'
import { useAppItemFields } from './hook'

type SupportedFields = 'path' | 'dir' | 'params'

interface PAppItemFields
extends
ChangedProps<AppItem, SupportedFields>
{
    loading: boolean
    isUrl: boolean
}

export
function AppItemFields
({ loading, isUrl, data, onChange }: PAppItemFields )
{
    const { pathRef, searchFile, searchDir, showInExplorer } = useAppItemFields( isUrl )

    return (
        <>
            <FormField label={ isUrl ? 'Url' : 'Path'}>
                <input
                    ref={pathRef}
                    disabled={loading}
                    type="text"
                    value={data.path}
                    onChange={getValueFromInput( onChange( 'path' ))}
                />

                {
                    !isUrl && (
                        <>
                            <Button onClick={searchFile( onChange( 'path' ))}>...</Button>

                            <Button disabled={!data.path} onClick={showInExplorer( data.path ?? '' )}>
                                <ExternalIcon />
                            </Button>
                        </>
                    )
                }

            </FormField>

            {
                isUrl && (
                    <ProtocolError value={data.path} />
                )
            }

            {
                !isUrl && (
                    <>
                        <FormField label="Working directory">
                            <input
                                disabled={loading}
                                type="text"
                                value={data.dir}
                                onChange={getValueFromInput( onChange( 'dir' ))}
                            />

                            <Button onClick={searchDir( onChange( 'dir' ))}>...</Button>
                            <Button onClick={showInExplorer( data.dir ?? '', true )}><ExternalIcon /></Button>
                        </FormField>

                        <FormField label="Arguments">
                            <input
                                disabled={loading}
                                type="text"
                                value={data.params}
                                onChange={getValueFromInput( onChange( 'params' ))}
                            />
                        </FormField>
                    </>
                )
            }
        </>
    )
}
