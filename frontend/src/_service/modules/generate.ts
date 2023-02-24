import { TFolder, TLink } from 'models'

export default () => ({
    folder: ( name: string, parent?: string ): TFolder => ({
        id:       crypto.randomUUID(),
        weight:   0,
        name,
        children: [],
        parent
    }),

    link: ({ name, path, params, dir, parent }: Omit<TLink, 'id' | 'weight'> ): TLink => ({
        id:     crypto.randomUUID(),
        weight: 0,
        name,
        path,
        params,
        parent,
        dir
    })
})
