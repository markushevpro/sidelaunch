import type { ILibrary } from 'src/@/shared/types/items'

export
interface ILibraryStoreData
{
    library?: ILibrary
}

interface ILibraryStoreActions
{
    update: ( payload: Partial<ILibraryStoreData> ) => void
}

export
type ILibraryStore = ILibraryStoreData & ILibraryStoreActions
