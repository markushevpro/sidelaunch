import { useCallback } from 'react'
import { ListButton }  from 'src/@/segments/units/ListButton'
import { useDnDStore } from 'src/@/services/dnd/store'

import styles from './last-place.module.css'

export
function LastPlace
()
{
    const { hover } = useDnDStore()

    const onHover = useCallback(
        () => {
            hover( undefined )
        },
        [ hover ]
    )

    return (
        <ListButton className={styles.place} onDragOver={onHover} />
    )
}
