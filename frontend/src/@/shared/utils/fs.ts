import type { FolderItem, ListItem, AppItem } from 'src/@/shared/types/items'

export
function isFolder
( item: ListItem ): boolean
{
    // eslint-disable-next-line no-prototype-builtins
    return item.hasOwnProperty( 'children' )
}

export
function FileOrFolder
( item: ListItem, onLink: ( link: AppItem ) => void, onFolder: ( item: FolderItem ) => void ): void
{
    if ( !isFolder( item )) {
        onLink( item as AppItem )
    } else {
        onFolder( item as FolderItem )
    }
}

export
function run
( data: ListItem ): void
{
    FileOrFolder(
        data,
        () => {
            runFile( data as AppItem )
        },
        () => {
            // store.set( data.id )
        }
    )
}

export
function runFile
( link: AppItem ): void
{
    // link.params
    //     ? window.backend.fs.run({
    //         path: link.path,
    //         args: link.params,
    //         dir:  link.dir
    //     })
    //     : window.backend.fs.run( link.path )
}
