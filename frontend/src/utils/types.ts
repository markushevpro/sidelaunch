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
