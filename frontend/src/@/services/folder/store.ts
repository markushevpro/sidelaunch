import { create } from 'zustand'

import type { FolderItem, ListItem } from 'src/@/shared/types/items'

export
interface CurrentFolderStoreData
{
    waitUpdate: string[]
    folder?: FolderItem
    items: ListItem[]
}

interface CurrentFolderStoreActions
{
    update: ( payload: Partial<CurrentFolderStoreData> ) => void
}

export
type CurrentFolderStore = CurrentFolderStoreData & CurrentFolderStoreActions

export
const useFolderStore = create<CurrentFolderStore>(( set ) => ({
    waitUpdate: [],
    folder:     undefined,
    items:      [],

    update: ( payload: Partial<CurrentFolderStoreData> ) => {
        set({ ...payload })
    }
}))
