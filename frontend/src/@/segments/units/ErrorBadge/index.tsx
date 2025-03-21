import { Badge } from 'src/@/segments/units/Badge'

import styles from './error-badge.module.css'

export
function ErrorBadge
()
{
    return (
        <Badge className={styles.error}>
            !
        </Badge>
    )
}
