import path from 'path'

import FS   from './FS.module'
import Read from './Read.module'

class Config {

    filePath = 'data/config.json'

    get = ( key: string ) => {
        return this.read()[ key ]
    }

    read = () => Read.json( path.resolve( FS.appPath(), this.filePath ))

    load = this.read

    write = ( data: string ) => FS.write( path.resolve( FS.appPath(), this.filePath ), data )

}

export default new Config()
