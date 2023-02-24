import { TLink } from 'models'

export default ( cls: any ) => ({
    add: ( files: File[]) => {
        if ( files.length > 1 ) {
            cls.insert.multiple( files )
        } else {
            cls.insert.file( files[ 0 ])
        }
    },

    run: ( link: TLink ) => {
        link.params
            ? window.backend.fs.run({
                path: link.path,
                args: link.params,
                dir:  link.dir
            })
            : window.backend.fs.run( link.path )
    }
})
