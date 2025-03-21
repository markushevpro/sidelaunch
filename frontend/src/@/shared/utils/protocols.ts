import type { AppItem } from 'src/@/shared/types/items'

export
function byProtocol
( data: AppItem, map: Record<string, ( path: string ) => void | Promise<void>> & { _: ( path: string ) => void | Promise<void> }): void
{
    const path     = data.path
    const protocol = path.split( ':' )[ 0 ].toLocaleLowerCase()

    if ( map[ protocol ]) {
        void map[ protocol ]( path )
    } else {
        void map._( path )
    }
}
