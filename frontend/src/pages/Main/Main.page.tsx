
import { observer }                                 from 'mobx-react-lite'
import { useCallback, useEffect, useRef, useState } from 'react'
import { DndProvider }                              from 'react-dnd'
import { HTML5Backend }                             from 'react-dnd-html5-backend'

import { DragLayer, List, Uploader } from 'components'
import { TFolder, TItem }            from 'models'
import Service, { store }            from 'service'
import { IorF }                      from 'utils'

const
    MainPage = observer(() => {
        const
            { folder, folders, items } = store,
            uploader = useRef<HTMLInputElement>( null ),
            [ iconChange, $iconChange ] = useState<TItem | TFolder>(),

            handleClick = ( data: TFolder | TItem ) => {
                // eslint-disable-next-line no-prototype-builtins
                IorF(
                    data,
                    () => Service.run(( data as TItem ).path ),
                    () => {
                        Service.folders.flush()
                        Service.items.flush()
                        Service.current( data as TFolder )
                    }
                )
            },

            showItemMenu = ( data: TFolder | TItem ) => {
                window.backend.ui.itemMenu( JSON.stringify( data ))
            },

            changeIcon = ( item: TItem | TFolder ) => {
                $iconChange( item )

                if ( uploader.current ) {
                    uploader.current.value = ''
                    uploader.current.click()
                }
            },

            saveIcon = ( path: string ) => {
                iconChange && Service.changeIcon( iconChange, path )
                $iconChange( void 0 )
            },

            createFolder = () => {
                Service.create( 'New folder' )
            },

            goBack = useCallback(() => {
                if ( folder ) {
                    ( folder.parentId )
                        ? Service.get( folder.parentId, 'folder' ).then( f => Service.current( f ))
                        : Service.current( void 0 )
                }
            }, [ folder ]),

            preremove = {
                item: ( id: string ) => {
                    const
                        itemsUpdate = [ ...items ],
                        found = itemsUpdate.findIndex( item => item.id === +id )

                    if ( found > -1 ) {
                        itemsUpdate.splice( found, 1 )
                        Service.items.set( itemsUpdate )
                    }
                },

                folder: ( id: string ) => {
                    const
                        foldersUpdate = [ ...folders ],
                        found = foldersUpdate.findIndex( folder => folder.id === +id )

                    if ( found > -1 ) {
                        foldersUpdate.splice( found, 1 )
                        Service.folders.set( foldersUpdate )
                    }
                }
            }

        useEffect(() => {
            window.backend.on.changeIcon(( itemJSON: string ) => {
                const
                    item = JSON.parse( itemJSON )

                changeIcon( item )
            })

            window.backend.on.removeItem( preremove.item )
            window.backend.on.removeFolder( preremove.folder )
        }, [])

        useEffect(() => {
            Service.folders.list()
            Service.items.list()
        }, [ folder ])

        return (

            <div
                className="app"
                onDragLeave={() => window.backend.ui.moveout()}
                onDragOver={() => window.backend.ui.movein()}
                onMouseEnter={() => window.backend.ui.movein()}
                onMouseLeave={() => window.backend.ui.moveout()}
            >
                <DndProvider backend={HTML5Backend}>
                    <DragLayer onDrop={Service.files.add}>
                        <Uploader ref={uploader} onUpload={saveIcon} />

                        <List
                            data={[ ...folders, ...items ]}
                            onAdd={createFolder}
                            onBack={ folder ? goBack : void 0 }
                            onItemClick={handleClick}
                            onMenu={showItemMenu}
                        />
                    </DragLayer>
                </DndProvider>
            </div>
        )
    })

export default MainPage
