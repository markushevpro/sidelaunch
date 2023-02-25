/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames                     from 'classnames'
import { DropTargetMonitor, useDrop } from 'react-dnd'
import { NativeTypes }                from 'react-dnd-html5-backend'

import { TWithChildren } from 'utils'

import styles from './drag-layer.module.scss'

type IDragLayerProps = TWithChildren & {
    onDrop: ( file: any ) => void
}

const DragLayer = ({ children, onDrop }: IDragLayerProps ) => {
    const
        [ { canDrop, isOver }, drop ] = useDrop(
            () => ({
                accept: [ NativeTypes.FILE ],
                drop ( item: { files: any[] }) {
                    onDrop && onDrop( item.files )
                },
                canDrop ( item: any ) {
                    if ( !item.files[ 0 ]?.type && !item.files[ 0 ]?.size ) { return false }
                    return true
                },
                collect: ( monitor: DropTargetMonitor ) => {
                    return {
                        isOver:  monitor.isOver(),
                        canDrop: monitor.canDrop(),
                    }
                },
            }),
            [],
        )

    return (
        <div ref={drop} className={classNames( styles.dragLayer, isOver && canDrop && styles.canDrop, isOver && !canDrop && styles.cantDrop )}>
            { children }
        </div>
    )
}

export default DragLayer
