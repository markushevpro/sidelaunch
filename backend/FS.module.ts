/* eslint-disable no-case-declarations */
import { spawn } from 'child_process'
import fs        from 'fs'
import fspath    from 'path'

import { app, shell } from 'electron'

type TStruct = {
    [key: string]: string
}

class FS {

    run = ( pathOrPayload: string | TStruct ) => {
        if ( typeof pathOrPayload === 'string' ) {
            shell.openPath( pathOrPayload as string )
        } else {
            if ( pathOrPayload.dir ) {
                spawn( pathOrPayload.path.split( '\\' ).pop() as string, [ pathOrPayload.args ], {
                    cwd:   pathOrPayload.dir,
                    shell: 'cmd'
                })
            } else {
                const
                    split = pathOrPayload.path.split( '\\' ),
                    name = split.pop() as string,
                    path = split.join( '\\' )

                spawn( name, [ pathOrPayload.args ], {
                    shell: 'cmd',
                    cwd:   path
                })
            }
        }
    }

    appPath = () => app ? app.getAppPath() : `${__dirname}/..`

    read = ( path: string ) => fs.readFileSync( path )

    write = ( path: string, data: string | NodeJS.ArrayBufferView ) => fs.writeFileSync( path, data )

    copy = ( from: string, to: string, force = false ) => fs.copyFileSync( from, to, force ? fs.constants.COPYFILE_FICLONE_FORCE : fs.constants.COPYFILE_EXCL )

    remove = ( file: string ) => {
        if ( fs.existsSync( file )) {
            fs.unlinkSync( file )
        }
    }

    openPath = ( filePath: string | null ) => {
        if ( !filePath ) { return }
        shell.showItemInFolder( filePath )
    }
}

export default new FS()
