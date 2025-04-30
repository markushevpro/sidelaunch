import { InputField }  from 'src/@/segments/units/InputField'
import { getPathInfo } from 'src/@/services/library/helpers'
import { Button }      from 'src/@/shared/ui-kit/Button'
import { FileButtons } from 'src/@/shared/ui-kit/FileButtons'
import { ArrowLeft }   from 'src/@/shared/ui-kit/icons/ArrowLeft'

import type { ChangedProps } from 'src/@/segments/units/ChangedProvider/types'
import type { AppItem }      from 'src/@/shared/types/items'

import { useFileItemFields } from './hook'

interface PFileItemFields
extends
ChangedProps<AppItem, 'path' | 'dir' | 'params'>
{
    loading: boolean
}

export
function FileItemFields
({ loading, data, onChange }: PFileItemFields )
{
    const { searchFile, searchDir, dirFromFile } = useFileItemFields( data.path )

    return (
        <>
            <InputField
                disabled={loading}
                label="Path"
                type="text"
                value={data.path}
                onChange={onChange( 'path' )}
            >
                <FileButtons
                    value={data.path}
                    onChange={onChange( 'path' )}
                    onSearch={searchFile}
                />
            </InputField>

            <InputField
                disabled={loading}
                label="Working directory"
                placeholder={data.dir ? '' : getPathInfo( data.path ).dir.replace( /\//g, '\\' ) }
                type="text"
                value={data.dir}
                onChange={onChange( 'dir' )}
            >
                <Button
                    disabled={!data.path}
                    style={{ marginLeft: 0 }}
                    title="Copy from path"
                    onClick={dirFromFile( onChange( 'dir' ))}
                >
                    <ArrowLeft />
                </Button>

                <FileButtons
                    dir
                    value={data.dir}
                    onChange={onChange( 'dir' )}
                    onSearch={searchDir}
                />
            </InputField>

            <InputField
                disabled={loading}
                label="Arguments"
                type="text"
                value={data.params}
                onChange={onChange( 'params' )}
            />

        </>
    )
}
