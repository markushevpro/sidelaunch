
import { observer }                                 from 'mobx-react-lite'
import { useCallback, useEffect, useRef, useState } from 'react'
import { DndProvider }                              from 'react-dnd'
import { HTML5Backend }                             from 'react-dnd-html5-backend'

import { DragLayer, List, Uploader } from 'components'
import { TFolder, TItem, TLink }     from 'models'
import Service, { store }            from 'service'
import { IorF }                      from 'utils'

const
    MainPage = observer(() => {
        const
            { folder } = store,
            uploader = useRef<HTMLInputElement>( null ),
            [ iconChange, $iconChange ] = useState<TItem>(),

            handleClick = ( data: TItem ) => {
                IorF(
                    data,
                    () => {
                        const link = data as TLink
                        Service.items.run( link )
                    },
                    () => Service.current.set( data as TFolder )
                )
            },

            showItemMenu = ( data: TItem ) => {
                window.backend.ui.itemMenu( JSON.stringify( data ))
            },

            saveIcon = ( path: string ) => {
                iconChange && Service.items.icon( iconChange, path )
                $iconChange( void 0 )
            },

            createFolder = () => {
                Service.items.create( 'New folder' )
            },

            goBack = useCallback(() => {
                Service.current.set( Service.get( folder.parent ) as TFolder )
            }, [ folder ])

        useEffect(() => {
            window.backend.on.removeFolder(({ id, recursive }: { id: string, recursive: boolean }) => {
                store.remove.folder( Service.get( id ) as TFolder, recursive )
            })

            window.backend.on.removeFile(( id: string ) => {
                store.remove.file( Service.get( id ) as TLink )
            })

            window.backend.on.changeIcon(( id: string ) => {
                $iconChange( Service.get( id ))

                if ( uploader.current ) {
                    uploader.current.value = ''
                    uploader.current.click()
                }
            })
        }, [])

        return (
            <div
                className = "app"
                onDragLeave = {() => window.backend.ui.moveout()}
                onDragOver = {() => window.backend.ui.movein()}
                onMouseEnter = {() => window.backend.ui.movein()}
                onMouseLeave = {() => window.backend.ui.moveout()}
            >
                <DndProvider backend={HTML5Backend}>
                    <DragLayer onDrop={Service.items.add}>
                        <Uploader ref={uploader} onUpload={saveIcon} />

                        <List
                            data = { folder.children }
                            onAdd = {createFolder}
                            onBack = { folder.parent ? goBack : void 0 }
                            onItemClick = {handleClick}
                            onMenu = {showItemMenu}
                        />
                    </DragLayer>
                </DndProvider>
            </div>
        )
    })

export default MainPage
