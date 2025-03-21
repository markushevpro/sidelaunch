import { create } from 'zustand'

import type { ListItem } from 'src/@/shared/types/items'

export
interface DnDStoreData
{
    hovered: string | undefined
    dragged: string | undefined
}

interface DnDStoreActions
{
    update: ( payload: Partial<DnDStoreData> ) => void
    start: ( item: ListItem ) => void
    hover: ( item: ListItem | undefined ) => void
    end: () => void
}

export
type DnDStore = DnDStoreData & DnDStoreActions

export
const useDnDStore = create<DnDStore>(( set ) => ({
    hovered: undefined,
    dragged: undefined,

    update: ( payload: Partial<DnDStoreData> ) => {
        set({ ...payload })
    },

    start: ( item: ListItem ) => {
        set({ dragged: item.id })
    },

    hover: ( item: ListItem | undefined ) => {
        set( store => {
            if ( item?.id !== store.dragged ) {
                return { hovered: item?.id }
            }

            return { hovered: undefined }
        })
    },

    end: () => {
        set({
            dragged: undefined,
            hovered: undefined
        })
    }
}))
