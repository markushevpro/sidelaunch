export
interface ListItem
{
    id: string
    weight?: number
    name?: string
    parent?: string
}

export
interface AppItem
extends
ListItem
{
    path: string,
    params: string,
    dir?: string
}

export
interface FolderItem
extends
ListItem
{
    children: ListItem[],
}

export
type AppConfigValue = string | number | null

export
interface AppConfig
{
    position: 'left'
    iconSize: number
    hideTimeout: number
}

export
type Library = ListItem[]
