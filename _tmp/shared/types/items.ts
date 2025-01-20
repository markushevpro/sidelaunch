export
interface IItem
{
    id: string,
    weight: number,
    name: string,
    parent?: string,
    icon?: string,
}

export
interface ILink
extends IItem
{
    path: string,
    params: string,
    dir?: string
}

export
interface IFolder
extends IItem
{
    children: IItem[],
}

export
type IConfigValue = string | number | null

export
type IConfig = Record<string, IConfigValue>;

export
type ILibrary = IItem[]
