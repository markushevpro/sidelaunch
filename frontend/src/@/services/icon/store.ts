import { create } from 'zustand'

export
interface IconsStoreData
{
    cache: string,
    error: string[]
}

interface IconsStoreActions
{
    failed: ( src: string ) => void
    revalidate: () => void
}

export
type IconsStore = IconsStoreData & IconsStoreActions

export
const useIconsStore = create<IconsStore>(( set ) => ({
    error: [],
    cache: crypto.randomUUID(),

    revalidate: () => {
        set({ cache: crypto.randomUUID() })
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
