import { useCallback, useMemo } from 'react'
import { useDnDStore }          from 'src/@/services/dnd/store'
import { useCurrentFolder }     from 'src/@/services/folder/hook'
import { useHookResult }        from 'src/@/shared/hooks/useHookResult'

interface HCreateFolderButton
{
    show: boolean
    hidden: boolean
    add: () => void
}

export
function useCreateFolderButton
(): HCreateFolderButton
{
    const { folder, create } = useCurrentFolder()
    const { dragged }        = useDnDStore()

    const hidden = useMemo(
        () => !!dragged,
        [ dragged ]
    )

    const add = useCallback(
        async () => {
            if ( folder ) {
                await create( folder )
            }
        },
        [ create, folder ]
    )

    return useHookResult({
        show: !!folder,
        hidden,
        add
    })
}
