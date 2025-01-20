import { create } from 'zustand'

import type { ILibraryStore, ILibraryStoreData } from './types'

export
const useLibraryStore = create<ILibraryStore>(( set ) => ({
    library: undefined,

    update: ( payload: Partial<ILibraryStoreData> ) => {
        set({ ...payload })
    },

    append: () => {
        // Placeholder
    }
}))
