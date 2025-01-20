import type { IFolder, IItem } from 'src/app/shared/types/items'

export

interface IListStoreData
{
    folder?: IFolder
    hovered: string | undefined
    dragged: string | undefined
    items: IItem[] | undefined
}

interface IListStoreActions
{
    update: ( payload: Partial<IListStoreData> ) => void
    append: () => void
}

export
type IListStore = IListStoreData & IListStoreActions
