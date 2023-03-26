import { TFolder, TItem, TLink } from 'models'


import { createFolder, createLink } from './generate'
import store                        from './store'

class StoreActions {

    constructor () {
        window.backend.on.removeFolder(({ id, keepChildren }: { id: string, keepChildren: boolean }) => {
            const found = store.get( id )
            this.removeFolder( found as TFolder, keepChildren )
        })

        window.backend.on.removeFile(( id: string ) => {
            const found = store.get( id )
            this.removeFile( found as TLink )
        })

        window.backend.on.reload(() => {
            store.load( true )
        })
    }

    current = (): TFolder => store.find( store.current?.id, store.library ) as TFolder

    rename = async ( item: TItem, name: string ) => {
        await store.update( item.id, { name })
    }

    updateArgs = async ( item: TLink, params: string ) => {
        await store.update( item.id, { params })
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

                case 'close':
                    //Do nothing
                    break

                default:
                    this.addMultipleFiles( files )
            }
        })
    }

    addFolder = async ( name: string ): Promise<TFolder> => {
        const
            parent = this.current(),
            newFolder = await store.insert( parent.id, createFolder( name, parent.id )) as TFolder

        return newFolder
    }

    addFilesAsFolder = async ( files: File[]) => {
        const
            name = `New ${files.length} element${files.length === 1 ? 's' : ''}`,
            target = this.current(),
            newFolder = await store.insert( target.id, createFolder( name, target.id )) as TFolder

        store.set( newFolder.id )

        this.addMultipleFiles( files )
    }

    addMultipleFiles = async ( files: File[]) => {
        const items: TItem[] = []

        for ( let i = 0; i < files.length; i++ ) {
            const generated = await this.generateLink( files[ i ])
            ;( generated ) && ( items.push( generated ))
        }

        await store.batchInsert( this.current().id, items )
    }

    addSingleFile = async ( file: File ) => {
        const link = await this.generateLink( file )
        ;( link ) && ( await store.insert( link.parent ?? 'top', link ))
    }

    generateLink = async ( file: File ): Promise<TLink | undefined> => {
        const
            checked = this.checkFile( file )

        if ( !checked ) {
            return
        }

        const
            info = await window.backend.files.info( file.path ),
            path = info.realPath,
            params = info.args,
            dir = info.dir,
            name = file.name.split( '.' ).slice( 0, -1 ).join( '.' ),
            parent = this.current(),
            item = createLink({
                name,
                path,
                parent: parent.id,
                params,
                dir
            })

        item.icon = await this.updateIcon( item, file.path )

        return item
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

    removeFile = async ( link: TLink ) => {
        await store.remove( link.id )
    }

    removeFolder = async ( folder: TFolder, keepChildren: boolean ) => {
        if ( keepChildren ) {
            const
                target = store.find( folder.id, store.library ) as TFolder,
                kids = target.children

            await store.batchInsert( target.parent ?? 'top', kids )
        }

        await store.remove( folder.id )
    }
}

export default new StoreActions()
