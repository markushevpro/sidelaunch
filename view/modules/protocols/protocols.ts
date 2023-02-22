import { protocol } from 'electron'

class Protocols {

    init () {
        protocol.registerFileProtocol( 'image', ( request, callback ) => {
            const pathname = request.url.replace( 'image://', '' )
            callback( pathname )
        })
    }

}

export default new Protocols()
