import { FormField }         from 'src/@/segments/composition/FormField'
import { Button }            from 'src/@/shared/ui-kit/Button'
import { ExternalIcon }      from 'src/@/shared/ui-kit/icons/External'
import { getValueFromInput } from 'src/@/shared/utils/inputs'

import { ProtocolError }    from './ProtocolError'
import { useAppItemFields } from './hook'

type SupportedFields = 'path' | 'dir' | 'params'

interface PAppItemFields
{
    loading: boolean
    isUrl: boolean
    values: Record<SupportedFields, string | undefined>
    onChange: Record<SupportedFields, ( val: string ) => void>
}

export
function AppItemFields
({ loading, isUrl, values, onChange }: PAppItemFields )
{
    const { pathRef, searchFile, searchDir, showInExplorer } = useAppItemFields( isUrl )

    return (
        <>
            <FormField label={ isUrl ? 'Url' : 'Path'}>
                <input
                    ref={pathRef}
                    disabled={loading}
                    type="text"
                    value={values.path}
                    onChange={getValueFromInput( onChange.path )}
                />

                {
                    !isUrl && (
                        <>
                            <Button onClick={searchFile( onChange.path )}>...</Button>

                            <Button disabled={!values.path} onClick={showInExplorer( values.path ?? '' )}>
                                <ExternalIcon />
                            </Button>
                        </>
                    )
                }

            </FormField>

            {
                isUrl && (
                    <ProtocolError value={values.path} />
                )
            }

            {
                !isUrl && (
                    <>
                        <FormField label="Working directory">
                            <input
                                disabled={loading}
                                type="text"
                                value={values.dir}
                                onChange={getValueFromInput( onChange.dir )}
                            />

                            <Button onClick={searchDir( onChange.dir )}>...</Button>
                            <Button onClick={showInExplorer( values.dir ?? '', true )}><ExternalIcon /></Button>
                        </FormField>

                        <FormField label="Arguments">
                            <input
                                disabled={loading}
                                type="text"
                                value={values.params}
                                onChange={getValueFromInput( onChange.params )}
                            />
                        </FormField>
                    </>
                )
            }
        </>
    )
}
