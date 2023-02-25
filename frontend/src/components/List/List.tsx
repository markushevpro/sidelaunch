
import { useEffect, useRef, useState } from 'react'

import { TFolder, TItem }      from 'models'
import store, { StoreActions } from 'store'

import ListView from './components/ListView/ListView'
import Uploader from './components/Uploader/Uploader'

const List = ({ data }: { data: TFolder }) => {
    const
        uploader = useRef<HTMLInputElement>( null ),
        [ iconChange, $iconChange ] = useState<TItem>(),

        saveIcon = ( path: string ) => {
            iconChange && StoreActions.updateIcon( iconChange, path )
            $iconChange( void 0 )
        }

    useEffect(() => {
        window.backend.on.changeIcon(( id: string ) => {
            $iconChange( store.get( id ))

            if ( uploader.current ) {
                uploader.current.value = ''
                uploader.current.click()
            }
        })
    }, [])

    return (
        <>
            <Uploader ref={uploader} onUpload={saveIcon} />
            <ListView data = { data } />
        </>
    )
}

export default List
