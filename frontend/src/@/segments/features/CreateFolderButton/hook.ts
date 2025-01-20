import { useCallback }      from 'react'
import { useCurrentFolder } from 'src/@/services/folder/hook'
import { useLibrary }       from 'src/@/services/library/hook'
import { useHookResult }    from 'src/@/shared/hooks/useHookResult'

interface HCreateFolderButton
{
    visible: boolean
    add: () => void
}

export
function useCreateFolderButton
(): HCreateFolderButton
{
    const { create } = useLibrary()
    const { folder } = useCurrentFolder()

    const add = useCallback(
        () => {
            if ( folder ) {
                create( folder )
            }
        },
        [ create, folder ]
    )

    return useHookResult({
        visible: !!folder,
        add
    })
}
