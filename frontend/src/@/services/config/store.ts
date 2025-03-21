import { create } from 'zustand'

import type { AppConfig } from 'src/@/shared/types/items'

export
interface ConfigStoreData
{
    config?: AppConfig
}

interface ConfigStoreActions
{
    update: ( payload: Partial<ConfigStoreData> ) => void
}

export
type ConfigStore = ConfigStoreData & ConfigStoreActions

export
const useConfigStore = create<ConfigStore>(( set ) => ({
    config: undefined,

    update: ( payload: Partial<ConfigStoreData> ) => {
        set({ ...payload })
    }
}))
