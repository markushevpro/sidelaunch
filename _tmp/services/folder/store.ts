import { create } from 'zustand'

import type { IFolderStore, IFolderStoreData } from './types'

import { initialState } from './initial'

export
const useFolderStore = create<IFolderStore>(( set ) => ({
    ...initialState,

    update: ( payload: Partial<IFolderStoreData> ) => {
        set({ ...payload })
    },

    append: () => {
        // Placeholder
    }
}))
