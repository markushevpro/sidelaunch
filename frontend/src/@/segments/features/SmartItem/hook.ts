import { useCallback } from 'react'

import { useCurrentFolder } from 'src/@/services/folder/hook'
import { useAppView }       from 'src/@/services/view/hook'
import { useHookResult }    from 'src/@/shared/hooks/useHookResult'

import type { MouseEvent } from 'react'
import type { ListItem }   from 'src/@/shared/types/items'

interface HSmartItem
{
    edit:( e: MouseEvent ) => void
}

export
function useSmartItem
( data: ListItem ): HSmartItem
{
    const { editMode }   = useAppView()
    const { waitUpdate } = useCurrentFolder()

    const edit = useCallback(
        ( e: MouseEvent ) => {
            e.preventDefault()
            editMode( data )
            waitUpdate( data.id )
        },
        [ data, editMode, waitUpdate ]
    )

    return useHookResult({ edit })
}
