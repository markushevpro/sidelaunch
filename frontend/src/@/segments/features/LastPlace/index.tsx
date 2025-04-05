import { useCallback } from 'react'

import { AllowDrop }        from 'src/@/segments/units/AllowDrop'
import { ListButton }       from 'src/@/segments/units/ListButton'
import { useDnDStore }      from 'src/@/services/dnd/store'
import { useCurrentFolder } from 'src/@/services/folder/hook'

import type { ListItem } from 'src/@/shared/types/items'

import styles from './last-place.module.css'

export
function LastPlace
()
{
    const { hover }    = useDnDStore()
    const { sortLast } = useCurrentFolder()

    const onHover = useCallback(
        () => {
            hover( undefined )
        },
        [ hover ]
    )

    const onDrop = useCallback(
        ( a: ListItem ) => {
            void sortLast( a )
        },
        [ sortLast ]
    )

    return (
        <AllowDrop
            className={styles.dropzone}
            onDrop={onDrop}
            onHover={onHover}
        >
            <ListButton className={styles.place} onDragOver={onHover} />
        </AllowDrop>
    )
}
