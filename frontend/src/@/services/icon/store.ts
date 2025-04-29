import { create } from 'zustand'

export
interface IconsStoreData
{
    cache: string,
    loaded: string[],
    error: string[]
}

interface IconsStoreActions
{
    failed: ( src: string ) => void
    success: ( src: string ) => void
    revalidate: () => void
}

export
type IconsStore = IconsStoreData & IconsStoreActions

export
const useIconsStore = create<IconsStore>(( set ) => ({
    error:  [],
    loaded: [],
    cache:  crypto.randomUUID(),

    revalidate: () => {
        set({ cache: crypto.randomUUID() })
    },

    success: ( src: string ) => {
        set(({ loaded }) => {
            if ( !loaded.includes( src )) {
                return {
                    loaded: [
                        ...loaded,
                        src
                    ]
                }
            }

            return { loaded }
        })
    },

    failed: ( src: string ) => {
        set(({ error }) => {
            if ( !error.includes( src )) {
                return {
                    error: [
                        ...error,
                        src
                    ]
                }
            }

            return { error }
        })
    }
}))
