import { create } from 'zustand'

import type { ListItem } from 'src/@/shared/types/items'

export
type AppView = 'list' | 'edit'

export
interface AppViewStoreData
{
    view: AppView
    item: ListItem | undefined
}

interface AppViewStoreActions
{
    update: ( payload: Partial<AppViewStoreData> ) => void
}

export
type AppViewStore = AppViewStoreData & AppViewStoreActions

export
const useAppViewStore = create<AppViewStore>(( set ) => ({
    view: 'list',
    item: undefined,

    update: ( payload: Partial<AppViewStoreData> ) => {
        set({ ...payload })
    }
}))
