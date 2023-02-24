import { TFolder, TItem, TLink } from 'models'


import { createFolder, createLink } from './generate'
import { prepareForView }           from './manipulations'
import store                        from './store'

class StoreActions {

    constructor () {
        window.backend.on.removeFolder(({ id, recursive }: { id: string, recursive: boolean }) => {
            this.removeFolder( store.get( id ) as TFolder, recursive )
        })

        window.backend.on.removeFile(( id: string ) => {
            this.removeFile( store.get( id ) as TLink )
        })
    }

    rename = ( item: TItem, name: string ) => {
        item.name = name
        store.save()
    }

    append = ( files: File[]) => {
        if ( files.length < 2 ) {
            this.addSingleFile( files[ 0 ])
            return
        }

        window.backend.ui.askForMultiple( files.length ).then(( answer: string ) => {
            switch ( answer ) {
                case 'folder':
                    this.addFilesAsFolder( files )
                    break
                default:
                    this.addMultipleFiles( files )
            }
        })
    }

    addFolder = async ( name: string ): Promise<TFolder> => {
        const
            target = store.folder(),
            newFolder = await prepareForView( createFolder( name, target.id )) as TFolder

        target.children = [ ...target.children, newFolder ]
        store.set( newFolder )

        store.save()
        return newFolder
    }

    addFilesAsFolder = async ( files: File[]) => {
        const
            name = `New ${files.length} element${files.length === 1 ? 's' : ''}`,
            target = store.folder(),
            newFolder = await prepareForView( createFolder( name, target?.id )) as TFolder

        target.children = [ ...target.children, newFolder ]
        store.current = newFolder

        this.addMultipleFiles( files )

        store.save()
    }

    addMultipleFiles = ( files: File[]) => {
        files.forEach(( file ) => {
            this.addSingleFile( file )
        })
    }

    addSingleFile = async ( file: File ) => {
        const
            checked = this.checkFile( file )

        if ( !checked ) {
            return
        }

        const
            path = await window.backend.files.realPath( file.path ),
            params = await window.backend.files.args( file.path ),
            dir = await window.backend.files.dir( file.path ),
            name = file.name.split( '.' ).slice( 0, -1 ).join( '.' ),
            parent = store.folder(),
            item = createLink({
                name,
                path,
                parent: store.current?.id,
                params,
                dir
            })

        item.icon = await this.updateIcon( item, file.path )

        parent.children = [ ...parent.children, item ]
        store.current = parent

        store.save()
    }

    checkFile = ( file: File ) => {
        if ( !file.size && !file.type ) { return false }
        return true
    }


    updateIcon = async ( item: TItem, path?: string ) => {
        if ( path ) {
            const
                res = await window.backend.icons.update({
                    id: item.id,
                    path
                }),
                found = store.find( item.id, store.library )

            if ( found ) {
                found.icon = res
                store.refresh()
            }

            return res
        } else {
            return await window.backend.icons.remove( item.id )
        }
    }

    removeFile = ( link: TLink ) => {
        const
            parent: TFolder | undefined = store.find( link.parent, store.library ) as TFolder

        if ( !parent ) { return }

        parent.children.splice( parent.children.findIndex(( item: TItem ) => item.id === link.id ), 1 )

        parent.children = [ ...parent.children ]
        store.save()
    }

    removeFolder = ( folder: TFolder, keepChildren: boolean ) => {
        const
            parent: TFolder | undefined = store.find( folder.parent, store.library ) as TFolder

        if ( !parent ) { return }

        if ( keepChildren ) {
            parent.children = [ ...parent.children, ...folder.children ].filter(( item: TItem, index: number, arr: TItem[]) => arr.indexOf( item ) === index )
        }

        parent.children.splice( parent.children.findIndex(( item: TItem ) => item.id === folder.id ), 1 )

        parent.children = [ ...parent.children ]
        store.save()
    }
}

export default new StoreActions()
