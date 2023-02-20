export type TLink = {
    id: string,
    path: string,
    params: string,
    name: string,
    parent?: string,
    icon?: string,
    dir?: string
}

export type TFolder = {
    id: string,
    name: string,
    children: TItem[],
    parent?: string,
    icon?: string
}

export type TItem = TLink | TFolder

export type TConfig = {
    [key: string]: TConfigValue
}

export type TConfigValue = string | number | null

export type TLibrary = TItem[]
