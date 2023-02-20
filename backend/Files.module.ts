import { shell } from 'electron'

class Files {

    extention = ( path: string ) =>
        (
            path.indexOf( '.' ) > -1
                ? path.split( '.' ).pop()
                : ''
        )

    realPath = async ( path: string ) => {
        const
            ext = this.extention( path )

        switch ( ext ) {
            case 'lnk':
                return shell.readShortcutLink( path ).target

            default:
                return path
        }
    }

    args = async ( path: string ) => {
        const
            ext = this.extention( path )

        switch ( ext ) {
            case 'lnk':
                return shell.readShortcutLink( path ).args

            default:
                return ''
        }
    }

    dir = async ( path: string ) => {
        const
            ext = this.extention( path )

        switch ( ext ) {
            case 'lnk':
                return shell.readShortcutLink( path ).cwd

            default:
                return ''
        }
    }
}

export default new Files()
