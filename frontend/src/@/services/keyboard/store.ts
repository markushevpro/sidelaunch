import { create } from 'zustand'

export
interface KeyboardStoreData
{
    ctrl: boolean
}

interface KeyboardStoreActions
{
    update: ( payload: Partial<KeyboardStoreData> ) => void
}

export
type KeyboardStore = KeyboardStoreData & KeyboardStoreActions

export
const useKeyboardStore = create<KeyboardStore>(( set ) => ({
    ctrl: false,

    update: ( payload: Partial<KeyboardStoreData> ) => {
        set({ ...payload })
    }
}))
