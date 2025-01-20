import { useCallback, useEffect, useRef, useState } from 'react'

import type { PropsWithChildren } from 'react'
import type { IItem }             from 'src/@/shared/types/items'

import { Uploader } from './Uploader'

export
function IconChanger
({ children }: PropsWithChildren )
{
    const uploader = useRef<HTMLInputElement>( null )

    const [ iconChange, $iconChange ] = useState<IItem>()

    const saveIcon = useCallback(
        ( path: string ) => {
            if ( iconChange ) {
                $iconChange( void 0 )
                // StoreActions.updateIcon( iconChange, path ).then(() => {
                //     store.load( true )
                // })
            }
        },
        [ iconChange ]
    )

    useEffect(() => {
        // window.backend.on.changeIcon(( id: string ) => {
        //     $iconChange( store.get( id ))

        //     if ( uploader.current ) {
        //         uploader.current.value = ''
        //         uploader.current.click()
        //     }
        // })
    }, [])

    return (
        <>
            <Uploader ref={uploader} onUpload={saveIcon} />
            { children }
        </>
    )
}
