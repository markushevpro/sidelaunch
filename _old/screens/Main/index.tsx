import { Providers } from 'src/app/segments/appearance/Providers'
import { List }      from 'src/app/segments/behavior/List'

import type { ReactNode } from 'react'

export
function MainScreen
(): ReactNode
{
    return (
        <Providers>
            <List />
        </Providers>
    )
}
