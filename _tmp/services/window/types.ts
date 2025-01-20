export
interface IScreen
{
    isCurrent: boolean
    isPrimary: boolean
    size: {
        width : number
        height : number
    }
    physicalSize: {
        width: number
        height: number
    }
}
