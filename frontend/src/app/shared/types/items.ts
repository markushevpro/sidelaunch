export
interface ILink
{
    id: string,
    weight: number,
    path: string,
    params: string,
    name: string,
    parent?: string,
    icon?: string,
    dir?: string
}

export
interface IFolder
{
    id: string,
    weight: number,
    name: string,
    children: IItem[],
    parent?: string,
    icon?: string
}

export
type IItem = ILink | IFolder

export
type IConfigValue = string | number | null

export
type IConfig = Record<string, IConfigValue>;

export
type ILibrary = IItem[]
