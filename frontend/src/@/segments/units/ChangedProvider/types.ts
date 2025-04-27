export
type ChangeModifier<T extends object, K extends keyof T> = ( value: T[K]) => T[K]

export
interface ChangedProps
<T extends object, AllowedKeys extends keyof T = keyof T>
{
    data: T
    changed: boolean
    onChange: <K extends AllowedKeys>( key: K, modifier?: ChangeModifier<T, K> ) => ( value: T[K]) => void
}
