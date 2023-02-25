export interface TWithChildren {
    children: React.ReactNode
}

export interface TWithClassName {
    className: string
}

export interface TWithRef {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ref: React.RefObject<any>
}

export interface TStruct {
    [key: string]: string | number
}

export interface TWithID {
    id: string
}
