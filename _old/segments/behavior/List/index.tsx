import cn             from 'classnames'
import { useList }    from 'src/app/services/list/hook'
import { Scrollable } from 'src/app/shared/ui-kit/Scrollable'

import type { ReactNode } from 'react'
import type { IItem }     from 'src/app/shared/types/items'

import { AddButton }  from './AddButton'
import { BackButton } from './BackButton'
import { ListItem }   from './ListItem'
import styles         from './list.module.css'

export
function List
(): ReactNode
{
    const { items } = useList()

    return (
        <Scrollable>
            <ul className={styles.list}>
                <BackButton className={styles.item} />

                {
                    items.map(( item: IItem ) => (
                        <ListItem key={item.id} className={styles.item} item={item} />
                    ))
                }

                <AddButton className={cn( styles.item, styles.addButton )} />
            </ul>
        </Scrollable>
    )
}
