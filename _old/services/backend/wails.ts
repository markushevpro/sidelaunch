import type { IConfig, ILibrary } from 'src/app/shared/types/items'

import { LoadConfig, LoadLibrary } from '@/../wailsjs/go/main/App'

export
const wails = {
    icons: {
        // TMP
        // eslint-disable-next-line @typescript-eslint/require-await
        async get ( id: string ): Promise<string>
        {
            return ''
        }
    },
    library: {
        async load (): Promise<ILibrary>
        {
            const raw: string = await LoadLibrary()
            return JSON.parse( raw ) as ILibrary
        },
        async save ( data: string ): Promise<void>
        {
            // Placeholder
        }
    },
    config: {
        // TMP

        async load (): Promise<IConfig>
        {
            const raw: string = await LoadConfig()
            return JSON.parse( raw ) as IConfig
        }
    }
}
