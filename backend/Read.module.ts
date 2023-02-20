import FS from './FS.module'

class Read {

    raw = FS.read

    base64 = ( path: string ) => FS.read( path ).toString( 'base64' )

    string = ( path: string ) => FS.read( path ).toString()

    json = ( path: string ) => JSON.parse( FS.read( path ).toString())

}

export default new Read()
