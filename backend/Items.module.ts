import { TCreateItem } from 'models'

import Include from '../models/includes'

import FSModule    from './FS.module'
import CommonClass from './common.class'

class Items extends CommonClass {

    add = async ({ category, path, icon, name }: TCreateItem ) => {
        return this.withUpdateNotify( await this.prisma.item.create({
            data: {
                category,
                path,
                icon,
                name
            },
            ...Include.Item
        }))
    }

    get = async ( id: number ) => {
        return await this.prisma.item.findFirst({
            where: { id },
            ...Include.Item
        })
    }

    rename = async ( id: number, name: string ) => {
        return this.withUpdateNotify( await this.prisma.item.update({
            where: { id },
            data:  { name },
            ...Include.Item
        }))
    }

    changeIcon = async ( id: number, path: string ) => {
        const
            icon = await FSModule.getThumbnail( path )

        if ( !icon ) { return this.get( id ) }

        return this.withUpdateNotify( await this.prisma.item.update({
            where: { id },
            data:  { icon },
            ...Include.Item
        }))
    }

    list = async ( category: number | undefined ) => {
        return await this.prisma.item.findMany({
            where: { category },
            ...Include.Item
        })
    }

    remove = async ( id: number ) => {
        return this.withUpdateNotify( await this.prisma.item.delete({ where: { id } }))
    }

}

export default new Items()
