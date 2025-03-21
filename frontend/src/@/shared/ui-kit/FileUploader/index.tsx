import Upload from 'rc-upload'

import type { ComponentProps, PropsWithChildren } from 'react'

interface PFileUploader
extends
ComponentProps<typeof Upload>,
PropsWithChildren
{}

export
function FileUploader
({ children, ...rest }: PFileUploader )
{
    return (
        <Upload { ...rest }>
            { children }
        </Upload>
    )
}
