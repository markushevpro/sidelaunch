import { TFolder, TItem, TLink } from 'models'

import utils from './utils'

export default ( cls: any ) => ({
    file: ( link: TLink ) => {
        const parent: TFolder | undefined = utils.find( link.parent, cls.library ) as TFolder

        if ( !parent ) { return }

        parent.children.splice( parent.children.findIndex(( item: TItem ) => item.id === link.id ), 1 )

        parent.children = [ ...parent.children ]
        cls.save.library()
    },
    folder: ( folder: TFolder, keepChildren: boolean ) => {
        const parent: TFolder | undefined = utils.find( folder.parent, cls.library ) as TFolder

        if ( !parent ) { return }

        if ( keepChildren ) {
            parent.children = [ ...parent.children, ...folder.children ].filter(( item: TItem, index: number, arr: TItem[]) => arr.indexOf( item ) === index )
        }

        parent.children.splice( parent.children.findIndex(( item: TItem ) => item.id === folder.id ), 1 )

        parent.children = [ ...parent.children ]
        cls.save.library()
    }
})
