/* eslint-disable no-case-declarations */
import fs   from 'fs'
import path from 'path'

import { app, NativeImage, nativeImage, shell } from 'electron'

import Files   from './Files.module'
import Library from './Library.module'
import System  from './System.module'

class Icons {

    dir = path.resolve( System.appPath(), 'data/icons' )

    folderIcon = path.resolve( System.appPath(), 'assets/folder.png' )

    constructor () {
        this.clear()
    }

    path = ( id: string ) => path.resolve( this.dir, `${id}.png` )

    remove = ( id: string ) => Files.copy( this.folderIcon, this.path( id ))

    clear = () => {
        const
            dir = path.resolve( this.dir ),
            lib = Library.raw()

        fs.readdirSync( dir ).forEach(( file: string ) => {
            if ( ![ '.', '..' ].includes( file )) {
                if ( lib.indexOf( `"${file.split( '.' )[ 0 ]}"` ) < 0 ) {
                    Files.remove( path.resolve( dir, file ))
                }
            }
        })
    }

    read = {
        image: async ( path: string ) => {
            return await nativeImage.createThumbnailFromPath( path, {
                width:  64,
                height: 64
            })
        },

        path: async ( path: string ) => {
            return await nativeImage.createFromPath( path ).resize({
                width:  64,
                height: 64
            })
        },

        file: async ( path: string ): Promise<NativeImage | null> => {
            const
                ext = Files.extention( path )

            switch ( ext?.toLowerCase()) {
                case 'lnk':
                    const linkInfo = Files.info( path )

                    return ( linkInfo.icon )
                        ? this.extract( linkInfo.icon )
                        : this.extract( linkInfo.realPath )

                case 'exe':
                case 'bat':
                default:
                    // eslint-disable-next-line no-case-declarations
                    const
                        res = await app.getFileIcon( path )

                    return res
            }
        }
    }

    extract = async ( path: string ): Promise<NativeImage | null> => {
        const
            ext = Files.extention( path )

        switch ( ext?.toLowerCase()) {
            case 'png':
            case 'jpg':
            case 'bmp':
            case 'jpeg':
            case 'gif':
                return this.read.image( path )

            case 'ico':
                return this.read.path( path )

            default:
                return this.read.file( path )
        }
    }

    get = ( id: string ) =>
        (
            fs.existsSync( this.path( id ))
                ? Files.read.base64( this.path( id ))
                : Files.read.base64( this.folderIcon )
        )

    update = async ( payload: { id: string, path: string }) => {
        const icon = await this.extract( payload.path )

        if ( icon ) {
            Files.write( path.resolve( this.dir, `${payload.id}.png` ), icon.toPNG())
        }

        return icon?.toDataURL()
    }
}

export default new Icons()
