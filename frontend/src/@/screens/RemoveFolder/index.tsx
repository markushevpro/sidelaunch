import { useCallback, useMemo } from 'react'
import { Dialog }               from 'src/@/segments/composition/Dialog'
import { ItemView }             from 'src/@/segments/units/ItemView'
import { useLibrary }           from 'src/@/services/library/hook'
import { useAppView }           from 'src/@/services/view/hook'
import { Stack }                from 'src/@/shared/ui-kit/Stack'

import type { ComponentProps } from 'react'
import type { FolderItem }     from 'src/@/shared/types/items'
import type { Button }         from 'src/@/shared/ui-kit/Button'

export
function RemoveFolderScreen
()
{
    const { item }                     = useAppView()
    const { removeFolderSave, remove } = useLibrary()

    const folder = useMemo(() => item as FolderItem, [ item ])
    const count  = useMemo(() => folder.children.length, [ folder ])

    const cancel = useCallback(
        () => {
            window.runtime.Quit()
        },
        []
    )

    const removeSaveChildren = useCallback(
        () => {
            const handler = async () => {
                if ( folder.parent ) {
                    await removeFolderSave( folder )
                }

                window.runtime.Quit()
            }

            void handler()
        },
        [ folder, removeFolderSave ]
    )

    const removeWithChildren = useCallback(
        () => {
            const handler = async () => {
                await remove( folder )
                window.runtime.Quit()
            }

            void handler()
        },
        [ folder, remove ]
    )

    const buttons = useMemo(
        () => {
            const res: ComponentProps<typeof Button>[] = [
                {
                    alert:    true,
                    children: 'Remove with children',
                    onClick:  removeWithChildren
                }
            ]

            if ( folder.parent ) {
                res.push({
                    children: 'Move children to parent',
                    onClick:  removeSaveChildren
                })
            }

            res.push({
                ghost:    true,
                children: 'Cancel removement',
                onClick:  cancel
            })

            return res
        },
        [ cancel, folder.parent, removeSaveChildren, removeWithChildren ]
    )

    if ( !folder ) {
        return null
    }

    return (
        <Dialog
            buttons={buttons}
        >
            <p>
                {`You are going to remove folder "${folder.name}" with ${count} ${count.toString().endsWith( '1' ) ? 'child' : 'children'}.`}
            </p>

            <Stack align="center" gap={8} style={{ pointerEvents: 'none' }}>
                {
                    folder.children.map( item => (
                        <ItemView key={item.id} data={item} />
                    ))
                }
            </Stack>
        </Dialog>
    )
}
