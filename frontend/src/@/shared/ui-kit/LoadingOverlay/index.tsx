import { Spinner } from 'src/@/shared/ui-kit/Spinner'

import styles from './loading-overlay.module.css'

export
function LoadingOverlay
()
{
    return (
        <div className={styles.container}>
            <Spinner className={styles.spinner} />
        </div>
    )
}
