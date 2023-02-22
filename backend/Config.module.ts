import path from 'path'

import Files  from './Files.module'
import System from './System.module'

class Config {

    filePath = 'data/config.json'

    get = ( key: string ) => this.load()[ key ]

    load = () => Files.read.json( path.resolve( System.appPath(), this.filePath ))

    save = ( data: string ) => Files.write( path.resolve( System.appPath(), this.filePath ), data )

}

export default new Config()
