import { useCallback, useEffect, useState } from 'react'
import { GetPageData }                      from 'wailsjs/go/main/App'

interface PageData
{
    page: string
    id?: string
}

export
function usePageData
(): PageData
{
    const [ data, $data ] = useState<PageData>({ page: '' })

    const load = useCallback(
        async () => {
            const loaded = await GetPageData() as PageData

            if ( !loaded.page ) {
                $data({
                    ...loaded,
                    page: 'list'
                })
            } else {
                $data( loaded )
            }
        },
        []
    )

    useEffect(
        () => {
            void load()
        },
        [ load ]
    )

    return data
}
