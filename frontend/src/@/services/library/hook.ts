import _                                    from 'lodash'
import { useCallback, useEffect, useState } from 'react'

import { useHookResult }                         from 'src/@/shared/hooks/useHookResult'
import { isFolder }                              from 'src/@/shared/utils/items'
import { ExtractIcon, LoadLibrary, SaveLibrary } from 'wailsjs/go/main/App'

import type { AppItem, FolderItem, Library, ListItem } from 'src/@/shared/types/items'

import { addToLibrary, createAppItem, createFolder, findInLibrary, getIDs, mapParents, moveChildrenAndRemove, parseLibrary, removeFromLibrary, removeParents, resortItems, updateLibraryItem } from './helpers'
import { useLibraryStore }                                                                                                                                                                     from './store'

interface HLibrary
{
    library: Library | undefined
    loading: boolean
    ids: () => string[],
    load: () => Promise<Library | undefined>
    resort: ( parent: string, a: ListItem, b: ListItem ) => Promise<Library | undefined>
    append: ( files: string[], parent: string ) => Promise<Library | undefined>
    move: ( item: ListItem, target: string ) => Promise<Library | undefined>
    removeFolderSave: ( item: FolderItem ) => Promise<Library | undefined>
    create: ( parent: FolderItem ) => Promise<FolderItem | undefined>
    find: ( id: string | undefined ) => ListItem | undefined
    remove: ( item: ListItem ) => Promise<Library | undefined>
    updateItem: ( item: AppItem | FolderItem, payload: Partial<typeof item> ) => Promise<Library | undefined>
}

export
function useLibrary
(): HLibrary
{
    const { library, update } = useLibraryStore()

    const [ loading, $loading ] = useState<boolean>( false )

    const load = useCallback(
        async () => {
            $loading( true )

            const raw  = await LoadLibrary()
            const data = parseLibrary( raw )

            if ( data ) {
                update({ library: data })
            }

            $loading( false )

            return data
        },
        [ update ]
    )

    const find = useCallback(
        ( id: string | undefined ): ListItem | undefined => {
            if ( library && id ) {
                return findInLibrary( library, id )
            }

            return undefined
        },
        [ library ]
    )

    const manipulate = useCallback(
        async ( handler: ( lib: Library ) => typeof lib | Promise<typeof lib> ) => {
            if ( library ) {
                const copy = await handler( _.cloneDeep<Library>( library ))
                const lib  = mapParents( _.cloneDeep( copy ))

                update({ library: lib })

                await SaveLibrary( JSON.stringify( removeParents( copy )))
                return lib
            }
        },
        [ library, update ]
    )

    const move = useCallback(
        async ( item: ListItem, target: string ) => {
            return await manipulate( lib => {
                const updated = removeFromLibrary( lib, item )
                return addToLibrary( updated, item, target )
            })
        },
        [ manipulate ]
    )

    const removeFolderSave = useCallback(
        async ( item: FolderItem ) => {
            return await manipulate( lib => {
                return moveChildrenAndRemove( lib, item )
            })
        },
        [ manipulate ]
    )

    const create = useCallback(
        async ( parent: FolderItem ): Promise<FolderItem | undefined> => {
            let created: FolderItem | undefined

            await manipulate( lib => {
                const { folder, updated } = createFolder( lib, parent )

                created = folder
                return updated
            })

            return created
        },
        [ manipulate ]
    )

    const remove = useCallback(
        async ( item: ListItem ) => {
            return await manipulate( lib => removeFromLibrary( lib, item ))
        },
        [ manipulate ]
    )

    const updateItem = useCallback(
        async ( item: AppItem | FolderItem, payload: Partial<typeof item> ) => {
            return await manipulate( lib => updateLibraryItem( lib, item, payload ))
        },
        [ manipulate ]
    )

    const append = useCallback(
        async ( files: string[], parent: string ) => {
            return await manipulate( async ( lib ) => {
                let result = [ ...lib ]

                for ( const file of files ) {
                    if ( file ) {
                        const { item, updated } = await createAppItem( result, parent, file )

                        if ( item ) {
                            await ExtractIcon( item.id, item.path )
                        }

                        result = updated
                    }
                }

                return result
            })
        },
        [ manipulate ]
    )

    const resort = useCallback(
        async ( parent: string, a: ListItem, b: ListItem ) => {
            return await manipulate( lib => {
                if ( parent === 'top' ) {
                    return resortItems( lib, a, b )
                } else {
                    const target = findInLibrary( lib, parent )

                    if ( target && isFolder( target )) {
                        target.children = resortItems( target.children, a, b )
                    }

                    return lib
                }
            })
        },
        [ manipulate ]
    )

    const ids = useCallback(
        () => {
            return getIDs( library ?? [], true )
        },
        [ library ]
    )

    useEffect(
        () => {
            if ( !library ) {
                void load()
            }
        },
        [ library, load ]
    )

    return useHookResult({
        library,
        loading,
        ids,
        load,
        append,
        find,
        move,
        removeFolderSave,
        create,
        remove,
        resort,
        updateItem
    })
}
