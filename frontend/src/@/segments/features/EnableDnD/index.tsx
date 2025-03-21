import { DndProvider }  from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DropLayer }    from 'src/@/segments/features/DropLayer'

import type { PropsWithChildren } from 'react'

export
function EnableDnD
({ children }: PropsWithChildren )
{
    return (
        <DndProvider backend={HTML5Backend}>
            <DropLayer>
                { children }
            </DropLayer>
        </DndProvider>
    )
}
