import type { IFolder, IItem } from 'src/app/shared/types/items'

export

interface IStoreData
{
    data?: IFolder
    hovered: string | undefined
    dragged: string | undefined
    items: IItem[] | undefined
}

interface IStoreActions
{
    update: ( payload: Partial<IStoreData> ) => void
    append: () => void
}

export
type IStore = IStoreData & IStoreActions
