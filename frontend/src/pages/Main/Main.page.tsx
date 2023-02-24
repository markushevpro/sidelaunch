
import { observer } from 'mobx-react-lite'

import { DragLayer, List, MoveLayer } from 'components'
import { useCurrent, StoreActions }   from 'store'

const
    MainPage = observer(() => {
        const
            current = useCurrent()

        return (
            <MoveLayer className="app">
                <DragLayer onDrop={StoreActions.append}>
                    <List data={current} />
                </DragLayer>
            </MoveLayer>
        )
    })

export default MainPage
