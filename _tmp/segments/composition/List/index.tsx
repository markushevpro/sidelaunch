import { CurrentFolderItems } from 'src/@/segments/composition/CurrentFolderItems'
import { AddButton }          from 'src/@/segments/features/AddButton'
import { BackButton }         from 'src/@/segments/features/BackButton'
import { Scrollable }         from 'src/@/shared/ui-kit/Scrollable'

import styles from './list.module.css'

export
function List
()
{
    return (
        <Scrollable>
            <ul className={styles.list}>
                <BackButton />
                <CurrentFolderItems />
                <AddButton />
            </ul>
        </Scrollable>
    )
}
