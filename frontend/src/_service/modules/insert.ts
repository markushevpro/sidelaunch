import { TFolder } from 'models'

import utils from './utils'

export default ( cls: any ) => ({
    multiple: ( files: File[]) => {
        window.backend.ui.askForMultiple( files.length ).then(( answer: string ) => {
            switch ( answer ) {
                case 'folder':
                    cls.insert.folder( files )
                    break
                default:
                    cls.insert.files( files )
            }
        })
    },

    folder: async ( nameOrFiles: File[] | string ) => {
        let name, files

        if ( typeof nameOrFiles === 'string' ) {
            name = nameOrFiles
            files = void 0
        } else {
            files = nameOrFiles
            name = `New ${files.length} element${files.length === 1 ? 's' : ''}`
        }

        const
            target = utils.find( cls.current?.id, cls.library ) as TFolder,
            newFolder = await utils.iconize( utils.parentize( cls.generate.folder( name ), target )) as TFolder

        target.children = [ ...target.children, newFolder ]
        cls.current = newFolder

        if ( files ) {
            cls.insert.files( files )
        }

        cls.save.library()
    },

    files: ( files: File[]) => {
        files.forEach(( file ) => {
            cls.insert.file( file )
        })
    },

    file: async ( file: File ) => {
        const
            checked = cls.check.file( file )

        if ( !checked ) {
            return
        }

        const
            path = await window.backend.files.realPath( file.path ),
            params = await window.backend.files.args( file.path ),
            dir = await window.backend.files.dir( file.path ),
            name = file.name.split( '.' ).slice( 0, -1 ).join( '.' ),
            parent = utils.find( cls.current?.id, cls.library ) as TFolder,
            item = cls.generate.link({
                name,
                path,
                parent: cls.current?.id,
                params,
                dir
            })

        item.icon = await cls.update.icon( item, file.path )

        parent.children = [ ...parent.children, item ]
        cls.current = parent

        cls.save.library()
    }
})
