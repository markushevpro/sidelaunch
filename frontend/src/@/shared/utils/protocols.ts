import type { AppItem } from 'src/@/shared/types/items'

type ProtocolRunner = ( path: string, cwd?: string, params?: string ) => void | Promise<void>

export
function byProtocol
(
    data: AppItem,
    map: Record<string, ProtocolRunner> & { _: ProtocolRunner }): void
{
    const path     = data.path
    const protocol = path.split( ':' )[ 0 ].toLocaleLowerCase()

    if ( map[ protocol ]) {
        void map[ protocol ]( path )
    } else {
        void map._( path, data.dir, data.params )
    }
}
