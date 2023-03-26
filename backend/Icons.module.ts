/* eslint-disable no-case-declarations */
import fs   from 'fs'
import path from 'path'

import { Resvg }                         from '@resvg/resvg-js'
import { app, NativeImage, nativeImage } from 'electron'

import Files   from './Files.module'
import Library from './Library.module'
import System  from './System.module'

class Icons {

    defSize = {
        width:  64,
        height: 64
    }

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
        svg: async ( path: string ) => {
            const
                svg = await Files.read.buffer( path ),
                opts = { background: 'transparent' },
                resvg = new Resvg( svg, opts ),
                pngData = resvg.render(),
                pngBuffer = pngData.asPng(),
                res = nativeImage.createFromBuffer( pngBuffer ).resize( this.defSize )

            return res
        },

        image: async ( path: string ) => {
            return await nativeImage.createThumbnailFromPath( path, this.defSize )
        },

        path: async ( path: string ) => {
            return await nativeImage.createFromPath( path ).resize( this.defSize )
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

            case 'svg':
                return this.read.svg( path )

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
