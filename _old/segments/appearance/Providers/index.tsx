import { useEffect }    from 'react'
import { DndProvider }  from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DragLayer }    from 'src/app/segments/appearance/DragLayer'
import { IconChanger }  from 'src/app/segments/appearance/IconChanger'
import { MoveLayer }    from 'src/app/segments/appearance/MoveLayer'
import { backend }      from 'src/app/services/backend'

import type { PropsWithChildren, ReactNode } from 'react'

export
function Providers
({ children }: PropsWithChildren ): ReactNode
{
    useEffect(
        () => {
            void backend.load()
        },
        []
    )

    return (
        <MoveLayer>
            <DndProvider backend={HTML5Backend}>
                <DragLayer>
                    <IconChanger>
                        { children }
                    </IconChanger>
                </DragLayer>
            </DndProvider>
        </MoveLayer>
    )
}
