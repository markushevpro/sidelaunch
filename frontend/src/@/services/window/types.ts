export
interface Screen
{
    isCurrent: boolean
    isPrimary: boolean
    size: {
        width : number
        height : number
    }
    physicalSize?: {
        width: number
        height: number
    }
}
