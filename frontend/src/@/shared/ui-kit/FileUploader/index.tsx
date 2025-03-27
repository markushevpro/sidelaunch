import Upload from 'rc-upload'

import { Center } from 'src/@/shared/ui-kit/Center'

import type { ComponentProps, PropsWithChildren } from 'react'

interface PFileUploader
extends
ComponentProps<typeof Upload>,
PropsWithChildren
{}

export
function FileUploader
({ children, onClick, ...rest }: PFileUploader )
{
    return (
        <Center onClick={onClick}>
            <Upload openFileDialogOnClick={false} { ...rest }>
                { children }
            </Upload>
        </Center>
    )
}
