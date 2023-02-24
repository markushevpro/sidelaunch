import { TItem } from 'models'

import utils from './utils'

export default ( cls: any ) => ({
    icon: async ( item: TItem, path?: string ) => {
        if ( path ) {
            const
                res = await window.backend.icons.update({
                    id: item.id,
                    path
                }),
                found = utils.find( item.id, cls.library )

            if ( found ) {
                found.icon = res
                cls.refresh()
            }

            return res
        } else {
            return await window.backend.icons.remove( item.id )
        }
    },
    name: ( item: TItem, name: string ) => {
        item.name = name
        cls.save.library()
    }
})
