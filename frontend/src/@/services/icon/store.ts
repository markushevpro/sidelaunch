import { create } from 'zustand'

export
interface IconsStoreData
{
    error: string[]
}

interface IconsStoreActions
{
    failed: ( src: string ) => void
}

export
type IconsStore = IconsStoreData & IconsStoreActions

export
const useIconsStore = create<IconsStore>(( set ) => ({
    error: [],

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
