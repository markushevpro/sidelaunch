import styles from './loading-overlay.module.css'

export
function LoadingOverlay
()
{
    return (
        <div className={styles.container}>
            <div className={styles.spinner} />
        </div>
    )
}
