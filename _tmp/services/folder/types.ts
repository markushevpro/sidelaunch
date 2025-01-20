import type { IFolder, IItem } from 'src/@/shared/types/items'

export

interface IFolderStoreData
{
    folder?: IFolder
    hovered: string | undefined
    dragged: string | undefined
    items: IItem[] | undefined
}

interface IFolderStoreActions
{
    update: ( payload: Partial<IFolderStoreData> ) => void
    append: () => void
}

export
type IFolderStore = IFolderStoreData & IFolderStoreActions
