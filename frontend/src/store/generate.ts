import { TFolder, TLink } from 'models'

export const emptyFolder =
    {
        id:       'none',
        weight:   0,
        name:     '',
        children: []
    }

export const createFolder = ( name: string, parent?: string ): TFolder =>
    ({
        id:       crypto.randomUUID(),
        weight:   0,
        name,
        children: [],
        parent
    })

export const createLink = ({ name, path, params, dir, parent }: Omit<TLink, 'id' | 'weight'> ): TLink =>
    ({
        id:     crypto.randomUUID(),
        weight: 0,
        name,
        path,
        params,
        parent,
        dir
    })
