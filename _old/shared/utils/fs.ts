import type { IFolder, IItem, ILink } from 'src/app/shared/types/items'

export
function isFolder
<T extends object>
( item: T ): boolean
{
    // eslint-disable-next-line no-prototype-builtins
    return item.hasOwnProperty( 'children' )
}

export
function FileOrFolder
( item: IItem, onLink: ( link: ILink ) => void, onFolder: ( item: IFolder ) => void ): void
{
    if ( !isFolder( item )) {
        onLink( item as ILink )
    } else {
        onFolder( item as IFolder )
    }
}

export
function run
( data: IItem ): void
{
    FileOrFolder(
        data,
        () => {
            runFile( data as ILink )
        },
        () => {
            // store.set( data.id )
        }
    )
}

export
function runFile
( link: ILink ): void
{
    // link.params
    //     ? window.backend.fs.run({
    //         path: link.path,
    //         args: link.params,
    //         dir:  link.dir
    //     })
    //     : window.backend.fs.run( link.path )
}
