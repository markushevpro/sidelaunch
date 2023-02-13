import { TCreateFolder, TFolder } from 'models'

import Include from '../models/includes'

import FSModule    from './FS.module'
import Items       from './Items.module'
import CommonClass from './common.class'

class Folders extends CommonClass {

    get = async ( id: number ) => {
        return await this.prisma.folder.findFirst({
            where: { id },
            ...Include.Folder
        })
    }

    rename = async ( id: number, name: string ) => {
        return this.withUpdateNotify( await this.prisma.folder.update({
            where: { id },
            data:  { name },
            ...Include.Folder
        }))
    }

    changeIcon = async ( id: number, path: string ) => {
        const
            icon = await FSModule.getThumbnail( path )

        if ( !icon ) { return this.get( id ) }

        return this.setIcon( id, icon )
    }

    setIcon = async ( id: number, icon: string ) => {
        return this.withUpdateNotify( await this.prisma.folder.update({
            where: { id },
            data:  { icon },
            ...Include.Folder
        }))
    }

    list = async ( parentId: number | undefined ) => {
        return await this.prisma.folder.findMany({
            where: { parentId },
            ...Include.Folder
        })
    }

    create = async ({ parentId, icon, name }: TCreateFolder ) => {
        return this.withUpdateNotify( await this.prisma.folder.create({
            data: {
                parentId,
                icon,
                name
            },
            ...Include.Folder
        }))
    }

    remove = async ( id: number ) => {
        return this.withUpdateNotify( await this.prisma.folder.delete({ where: { id } }))
    }

    removeRecoursive = async ( id: number ) => {
        const
            target: TFolder | null = await this.get( id )

        let i

        if ( !target ) { return }

        for ( i = 0; i < target.subdirs.length; i++ ) {
            await this.removeRecoursive( target.subdirs[ i ].id )
        }

        for ( i = 0; i < target.children.length; i++ ) {
            await Items.remove( target.children[ i ].id )
        }

        return this.remove( id )
    }
}

export default new Folders()
