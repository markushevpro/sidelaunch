import { useCallback, useMemo, useState } from 'react'

import { useDnDStore }      from 'src/@/services/dnd/store'
import { useCurrentFolder } from 'src/@/services/folder/hook'
import { useFolderStore }   from 'src/@/services/folder/store'
import { useAppView }       from 'src/@/services/view/hook'
import { useHookResult }    from 'src/@/shared/hooks/useHookResult'
import { useSystemDialogs } from 'src/@/shared/hooks/useSystemDialogs'

import type { AppItem } from 'src/@/shared/types/items'

interface HCreateButton
{
    show: boolean
    hidden: boolean
    list: boolean
    hide: () => void
    add: () => void
    folder: () => void
    file: () => void
    url: () => void
}

export
function useCreateButton
(): HCreateButton
{
    const { folder, create, append, insert, waitUpdate } = useCurrentFolder()
    const { waitUpdate: waitingUpdate }                  = useFolderStore()

    const { openFile } = useSystemDialogs()
    const { dragged }  = useDnDStore()
    const { editMode } = useAppView()

    const [ list, $list ] = useState<boolean>( false )

    const hidden = useMemo(
        () => !!dragged || waitingUpdate.length > 0,
        [ dragged, waitingUpdate.length ]
    )

    const addFolder = useCallback(
        async () => {
            if ( folder ) {
                await create( folder )
            }

            $list( false )
        },
        [ create, folder ]
    )

    const addFile = useCallback(
        async () => {
            if ( folder ) {
                const file = await openFile([ '*' ], 'Add icon' )

                if ( file ) {
                    await append([ file ])
                }
            }

            $list( false )
        },
        [ folder, openFile, append ]
    )

    const addURL = useCallback(
        async () => {
            const item: AppItem = {
                id:     crypto.randomUUID(),
                weight: folder?.children.length ?? 0,
                name:   '',
                parent: folder?.id ?? 'top',
                path:   '',
                params: '',
                dir:    ''
            }

            await insert( item )

            editMode( item, true )
            waitUpdate( item.id )

            $list( false )
        },
        [ folder, insert, editMode, waitUpdate ]
    )

    const add = useCallback(
        () => {
            $list( true )
        },
        []
    )

    const hide = useCallback(
        () => {
            $list( false )
        },
        []
    )

    return useHookResult({
        show:   !!folder,
        hidden,
        list,
        hide,
        add,
        folder: addFolder,
        file:   addFile,
        url:    addURL
    })
}
