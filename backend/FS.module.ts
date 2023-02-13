/* eslint-disable no-case-declarations */
import path from 'path'

import { app, nativeImage, shell } from 'electron'

class FS {

    run = ( path: string ) => {
        shell.openPath( path )
    }

    openPath = ( filePath: string | null ) => {
        if ( !filePath ) { return }
        shell.showItemInFolder( filePath )
    }

    getExtention = ( path: string ) =>
        (
            path.indexOf( '.' ) > -1
                ? path.split( '.' ).pop()
                : ''
        )

    getRealPath = async ( path: string ) => {
        const
            ext = this.getExtention( path )

        switch ( ext ) {
            case 'lnk':
                return shell.readShortcutLink( path ).target

            default:
                return path
        }
    }

    getFileIcon = async ( path: string ): Promise<string | null> => {
        const
            ext = this.getExtention( path )

        switch ( ext ) {
            case 'lnk':
                return this.getIcon( shell.readShortcutLink( path ).target )

            case 'exe':
            case 'bat':
            default:
                // eslint-disable-next-line no-case-declarations
                const
                    res = await app.getFileIcon( path )

                return res.toDataURL()
        }
    }

    getIcon = async ( path: string ): Promise<string | null> => {
        const
            ext = this.getExtention( path )

        switch ( ext ) {
            case 'png':
            case 'jpg':
            case 'bmp':
            case 'jpeg':
            case 'gif':
            case 'ico':
                const
                    image = await nativeImage.createThumbnailFromPath( path, {
                        width:  64,
                        height: 64
                    })

                return image.toDataURL()

            default:
                return this.getFileIcon( path )
        }
    }

    getThumbnail = this.getIcon
}

export default new FS()
