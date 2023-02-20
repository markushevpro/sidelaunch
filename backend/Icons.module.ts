/* eslint-disable no-case-declarations */
import fs   from 'fs'
import path from 'path'

import { app, NativeImage, nativeImage, shell } from 'electron'

import FS    from './FS.module'
import Files from './Files.module'
import Read  from './Read.module'

class Icons {
    dir = path.resolve( FS.appPath(), 'data/icons' )

    folderIcon = path.resolve( FS.appPath(), 'assets/folder.png' )

    constructor () {
        this.clear()
    }

    clear = () => {
        const
            dir = path.resolve( this.dir ),
            rawData = FS.read( path.resolve( FS.appPath(), 'data/data.json' ))

        fs.readdirSync( dir ).forEach(( file: string ) => {
            if ( ![ '.', '..' ].includes( file )) {
                if ( rawData.toString().indexOf( `"${file.split( '.' )[ 0 ]}` ) < 0 ) {
                    FS.remove( path.resolve( dir, file ))
                }
            }
        })
    }

    remove = ( id: string ) => {
        FS.copy( this.folderIcon, path.resolve( FS.appPath(), `data/icons/${id}.png` ))
    }

    load = ( id: string ) => {
        const iconpath = path.resolve( FS.appPath(), `data/icons/${id}.png` )

        if ( fs.existsSync( iconpath )) {
            return Read.base64( iconpath )
        } else {
            return Read.base64( this.folderIcon )
        }
    }

    update = async ( payload: { id: string, path: string }) => {
        const icon = await this.get( payload.path )

        if ( icon ) {
            FS.write( path.resolve( this.dir, `${payload.id}.png` ), icon.toPNG())
        }

        return icon?.toDataURL()
    }

    path = ( id: string ) => path.resolve( this.dir, `${id}.png` )

    fromFile = async ( path: string ): Promise<NativeImage | null> => {
        const
            ext = Files.extention( path )

        switch ( ext ) {
            case 'lnk':
                const linkInfo = shell.readShortcutLink( path )

                if ( linkInfo.icon ) {
                    return this.get( linkInfo.icon )
                } else {
                    return this.get( linkInfo.target )
                }

            case 'exe':
            case 'bat':
            default:
                // eslint-disable-next-line no-case-declarations
                const
                    res = await app.getFileIcon( path )

                return res
        }
    }

    base64 = async ( path: string ): Promise<string | null> => {
        const res = await this.get( path )
        return res ? res.toDataURL() : res
    }

    get = async ( path: string ): Promise<NativeImage | null> => {
        const
            ext = Files.extention( path )

        let image

        switch ( ext?.toLowerCase()) {
            case 'png':
            case 'jpg':
            case 'bmp':
            case 'jpeg':
            case 'gif':
                image = await nativeImage.createThumbnailFromPath( path, {
                    width:  64,
                    height: 64
                })

                return image

            case 'ico':
                image = await nativeImage.createFromPath( path ).resize({
                    width:  64,
                    height: 64
                })
                return image

            default:
                return this.fromFile( path )
        }
    }

    thumbnail = this.get
}

export default new Icons()
