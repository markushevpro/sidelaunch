import { TWithChildren, TWithClassName } from 'utils'

const MoveLayer = ({ className, children }: TWithChildren & TWithClassName ) => {
    return (
        <div
            className = { className }
            onDragLeave = {() => window.backend.ui.moveout()}
            onDragOver = {() => window.backend.ui.movein()}
            onMouseEnter = {() => window.backend.ui.movein()}
            onMouseLeave = {() => window.backend.ui.moveout()}
        >
            { children }
        </div>
    )
}

export default MoveLayer
