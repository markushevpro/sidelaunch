
import { observer }     from 'mobx-react-lite'
import { DndProvider }  from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import { DragLayer, List, MoveLayer } from 'components'
import { useCurrent, StoreActions }   from 'store'

const
    MainPage = observer(() => {
        const
            current = useCurrent()

        return (
            <MoveLayer className="app">
                <DndProvider backend={HTML5Backend}>
                    <DragLayer onDrop={StoreActions.append}>
                        <List data={current} />
                    </DragLayer>
                </DndProvider>
            </MoveLayer>
        )
    })

export default MainPage
