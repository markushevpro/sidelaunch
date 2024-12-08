import { create } from 'zustand'

import type { IStore, IStoreData } from './types'

import { initialState } from './initial'

export
const useAppStore = create<IStore>(( set ) => ({
    ...initialState,

    update: ( payload: Partial<IStoreData> ) => {
        set({ ...payload })
    },

    append: () => {
        // Placeholder
    }
}))
