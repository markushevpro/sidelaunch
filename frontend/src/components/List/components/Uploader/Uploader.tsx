import React from 'react'

import styles from './uploader.module.scss'

interface TUploaderProps {
    onUpload: ( path: string ) => void
}

const Uploader = React.forwardRef<HTMLInputElement, TUploaderProps>(( props: TUploaderProps, ref: React.ForwardedRef<HTMLInputElement> ) => {
    const
        getFile = () => {
            const
                file = ( ref as React.MutableRefObject<HTMLInputElement> )?.current?.files?.[ 0 ]

            if ( file ) {
                props.onUpload( file.path )
            }
        }

    return (
        <input
            ref={ref}
            className={styles.hidden}
            type="file"
            onChange={getFile}
        />
    )
})

export default Uploader
