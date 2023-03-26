/* eslint-disable no-case-declarations */
import { spawn } from 'child_process'
import path      from 'path'

import { app, shell } from 'electron'

type TStruct = {
    [key: string]: string
}

class System {

    appPath = () => {
        return app
            ? process.env.NODE_ENV?.trim() === 'development'
                ? app.getAppPath()
                : path.dirname( app.getPath( 'exe' ))
            : `${__dirname}/..`
    }

    run = ( pathOrPayload: string | TStruct ) => {
        ( typeof pathOrPayload === 'string' )
            ? this.runFile( pathOrPayload as string )
            : this.runLink( pathOrPayload as TStruct )
    }

    runLink = ( data: TStruct ) => {
        const
            split = data.path.split( '\\' ),
            name = split.pop() as string,
            path = data.dir || split.join( '\\' )

        spawn( name, [ data.args ], {
            shell: 'cmd',
            cwd:   path
        })
    }

    runFile = ( filePath: string ) => {
        shell.openPath( filePath )
    }

    openPath = ( filePath: string | null ) => {
        if ( !filePath ) { return }
        shell.showItemInFolder( filePath )
    }

}

export default new System()
