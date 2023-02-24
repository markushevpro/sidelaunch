import { TItem } from 'models'

export type IListProps = {
    data: Array<TItem>,
    onItemClick: ( data: TItem ) => void,
    onMenu: ( data: TItem ) => void,
    onBack?: () => void,
    onAdd: () => void
}
