import { TFolder } from 'models'

import utils from './utils'

export default ( cls: any ) => ({
    config:  () => window.backend.config.save( JSON.stringify( cls.config )),
    library: () => {
        window.backend.library.save( JSON.stringify(( utils.presave( cls.library ) as TFolder ).children ))

        if ( cls.current.id === 'top' ) {
            cls.current = cls.library
        }
    }
})
