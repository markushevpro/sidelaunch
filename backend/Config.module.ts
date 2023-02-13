import { TSetting } from 'models'

import defaultConfig from '../default.config'

import DB from './db.class'

class Config extends DB {

    get = async ( name: string ) => {
        const res = await this.prisma.setting.findFirst({ where: { name } })

        if ( !res ) {
            const
                created = await this.create({
                    name,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    value: ( defaultConfig as any )[ name ]
                })

            return created.value
        }

        return res.value
    }

    set = async ({ name, value }: TSetting ) => {
        return await this.prisma.setting.update({
            where: { name },
            data:  { value },
        })
    }

    create = async ({ name, value }: TSetting ) => {
        return await this.prisma.setting.create({
            data: {
                name,
                value: `${value}`
            }
        })
    }
}

export default new Config()
