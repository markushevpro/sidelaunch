import { create } from 'zustand'

export
interface WindowStoreData
{
    offset: number
    dpi: number
    onPlace: boolean
    visible: boolean
    drop: boolean
}

interface WindowStoreActions
{
    update: ( payload: Partial<WindowStoreData> ) => void
    fix: () => void
}

export
type WindowStore = WindowStoreData & WindowStoreActions

export
const useWindowStore = create<WindowStore>(( set ) => ({
    offset:  0,
    dpi:     1,
    onPlace: false,
    visible: false,
    drop:    false,

    update: ( payload: Partial<WindowStoreData> ) => {
        set({ ...payload })
    },

    fix: () => {
        set({ onPlace: true })
    }
}))
