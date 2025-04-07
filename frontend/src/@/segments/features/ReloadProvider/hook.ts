import { useEffect } from 'react'

import { useConfig }        from 'src/@/services/config/hook'
import { useCurrentFolder } from 'src/@/services/folder/hook'
import { useLibrary }       from 'src/@/services/library/hook'
import { useWindow }        from 'src/@/services/window/hook'

export
function useReloadProvider
(): void
{
    const config                              = useConfig()
    const wnd                                 = useWindow()
    const { loading, load }                   = useLibrary()
    const { refresh, stopWaiting, isWaiting } = useCurrentFolder()

    useEffect(
        () => {
            const watcher = async ([ _, what, id ]: string[]): Promise<void> => {
                switch ( what ) {
                    case 'show':
                        wnd.show()
                        break

                    case 'hide':
                        wnd.hide()
                        break

                    case 'config':
                        if ( !config.loading ) {
                            void config.load()
                        }
                        break

                    case 'library':
                        if ( id && !loading && isWaiting( id )) {
                            const lib = await load()
                            refresh( lib )
                            stopWaiting( id )
                        }
                        break

                    default:
                        console.log( 'Unknown reload: ' + what )
                }
            }

            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            window.runtime.EventsOn( 'reload', watcher )

            return () => {
                window.runtime.EventsOff( 'reload' )
            }
        },
        [ wnd, config, loading, isWaiting, load, refresh, stopWaiting ]
    )
}
