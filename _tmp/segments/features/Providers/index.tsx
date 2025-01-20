import { useEffect }         from 'react'
import { DndProvider }       from 'react-dnd'
import { HTML5Backend }      from 'react-dnd-html5-backend'
import { DropLayer }         from 'src/@/segments/features/DropLayer'
import { IconChanger }       from 'src/@/segments/features/IconChanger'
import { VisibilityHandler } from 'src/@/segments/features/VisiblityHandler'

import type { PropsWithChildren } from 'react'

export
function Providers
({ children }: PropsWithChildren )
{
    useEffect(
        () => {
            // void backend.load()
        },
        []
    )

    return (
        <VisibilityHandler>
            <DndProvider backend={HTML5Backend}>
                <DropLayer>
                    <IconChanger>
                        { children }
                    </IconChanger>
                </DropLayer>
            </DndProvider>
        </VisibilityHandler>
    )
}
