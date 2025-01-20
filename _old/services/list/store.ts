import { create } from 'zustand'

import type { IListStore, IListStoreData } from './types'

import { initialState } from './initial'

export
const useListStore = create<IListStore>(( set ) => ({
    ...initialState,

    update: ( payload: Partial<IListStoreData> ) => {
        set({ ...payload })
    },

    append: () => {
        // Placeholder
    }
}))
