import type { ChangedProps } from 'src/@/segments/units/ChangedProvider/types'
import type { AppItem }      from 'src/@/shared/types/items'

import { FileItemFields } from './FileItemFields'
import { UrlItemFields }  from './UrlItemFields'

interface PAppItemFields
extends
ChangedProps<AppItem, 'path' | 'dir' | 'params'>
{
    loading: boolean
    isUrl: boolean
}

export
function AppItemFields
({ isUrl, ...rest }: PAppItemFields )
{
    if ( isUrl ) {
        return (
            <UrlItemFields {...rest} />
        )
    }

    return (
        <FileItemFields {...rest} />
    )
}
