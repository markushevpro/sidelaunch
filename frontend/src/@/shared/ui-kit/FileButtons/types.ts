export
type SearchFunction = ( onFound: ( val: string ) => void ) => () => Promise<void>
