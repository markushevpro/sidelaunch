import { create } from 'zustand'

import type { Library } from 'src/@/shared/types/items'

export
interface LibraryStoreData
{
    library?: Library
}

interface LibraryStoreActions
{
    update: ( payload: Partial<LibraryStoreData> ) => void
}

export
type LibraryStore = LibraryStoreData & LibraryStoreActions

export
const useLibraryStore = create<LibraryStore>(( set ) => ({
    library: undefined,

    update: ( payload: Partial<LibraryStoreData> ) => {
        set({ ...payload })
    },

    append: () => {
        // Placeholder
    }
}))
