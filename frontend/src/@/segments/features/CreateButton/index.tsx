import cn from 'classnames'

import { ListButton } from 'src/@/segments/units/ListButton'
import { App }        from 'src/@/shared/ui-kit/icons/App'
import { Folder }     from 'src/@/shared/ui-kit/icons/Folder'
import { Plus }       from 'src/@/shared/ui-kit/icons/Plus'
import { Web }        from 'src/@/shared/ui-kit/icons/Web'

import styles              from './create-folder-button.module.css'
import { useCreateButton } from './hook'

export
function CreateButton
()
{
    const { show, hidden, list, add, hide, folder, file, url } = useCreateButton()

    if ( !show ) {
        return null
    }

    return (
        <>
            <div className={cn( styles.container, hidden && styles.hidden )}>
                <ListButton className={cn( styles.button, list && styles.locked )} onClick={add}>
                    <Plus />
                </ListButton>

                <div className={cn( styles.inner, !list && styles.locked )}>
                    <ListButton className={styles.button} title="Add custom link" onClick={url}>
                        <Web />
                    </ListButton>

                    <ListButton className={styles.button} title="Add link to a file" onClick={file}>
                        <App />
                    </ListButton>

                    <ListButton className={styles.button} title="Create folder" onClick={folder}>
                        <Folder />
                    </ListButton>
                </div>
            </div>

            <div className={cn( styles.backdrop, list && styles.visible )} onClick={hide} />
        </>
    )
}
