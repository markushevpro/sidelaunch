import { forwardRef, useCallback } from 'react'

import styles from './uploader.module.css'

interface PUploader
{
    onUpload: ( path: string ) => void
}

export
const Uploader = forwardRef<HTMLInputElement, PUploader>(
    ({ onUpload }: PUploader, ref: React.ForwardedRef<HTMLInputElement> ) =>
    {
        const getFile = useCallback(
            () => {
                const file = ( ref as React.MutableRefObject<HTMLInputElement> )?.current?.files?.[ 0 ]

                if ( file ) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
                    onUpload(( file as any ).path )
                }
            },
            [ onUpload, ref ]
        )

        return (
            <input
                ref={ref}
                className={styles.hidden}
                type="file"
                onChange={getFile}
            />
        )
    }
)
