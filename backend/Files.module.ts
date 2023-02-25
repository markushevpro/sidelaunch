/* eslint-disable no-case-declarations */
import fs from 'fs'

import { shell } from 'electron'

class Files {

    extention = ( path: string ) =>
        (
            path.indexOf( '.' ) > -1
                ? path.split( '.' ).pop()
                : ''
        )

    info = ( path: string ) => {
        const ext = this.extention( path )

        switch ( ext ) {
            case 'lnk':
                const info = shell.readShortcutLink( path )

                return {
                    ext,
                    path,
                    icon:     info.icon,
                    realPath: info.target,
                    args:     info.args,
                    dir:      info.cwd
                }

            default: {
                return {
                    ext,
                    path,
                    icon:     '',
                    realPath: path,
                    args:     '',
                    dir:      ''
                }
            }
        }
    }


    read = {
        buffer: ( path: string ) => fs.readFileSync( path ),
        base64: ( path: string ) => this.read.buffer( path ).toString( 'base64' ),
        string: ( path: string ) => this.read.buffer( path ).toString(),
        json:   ( path: string ) => JSON.parse( this.read.buffer( path ).toString())
    }

    write = ( path: string, data: string | NodeJS.ArrayBufferView ) => fs.writeFileSync( path, data )

    copy = ( from: string, to: string, force = false ) => fs.copyFileSync( from, to, force ? fs.constants.COPYFILE_FICLONE_FORCE : fs.constants.COPYFILE_EXCL )

    remove = ( file: string ) => {
        if ( fs.existsSync( file )) {
            fs.unlinkSync( file )
        }
    }
}

export default new Files()
