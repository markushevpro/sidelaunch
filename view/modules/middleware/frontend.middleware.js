/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const
    { ipcRenderer, contextBridge } = require( 'electron' ),
    beHandlers = {
        'items':   [ 'onUpdate', 'withUpdateNotify', 'runUpdate', 'add', 'get', 'rename', 'changeIcon', 'list', 'remove' ],
        'folders': [ 'onUpdate', 'withUpdateNotify', 'runUpdate', 'get', 'rename', 'changeIcon', 'list', 'create', 'remove' ],
        'config':  [ 'get', 'set', 'create' ],
        'fs':      [ 'run', 'getExtention', 'getRealPath', 'getIcon', 'getThumbnail' ]
    },
    elHandlers = { 'ui': [ 'movein', 'moveout', 'itemMenu', 'askForMultiple', 'answer', 'hide', 'show' ] },
    onHandlers = [ 'reload', 'reloadItems', 'reloadFolders', 'changeIcon', 'removeItem', 'removeFolder' ],
    handlers = {
        ...beHandlers,
        ...elHandlers
    },
    generate = () => {
        const
            res = { on: {} }

        onHandlers.forEach( key => {
            res.on[ key ] = cb => {
                ipcRenderer.on( key, ( _, ...args ) => cb( ...args ))
            }
        })

        Object.keys( handlers ).forEach( top => {
            res[ top ] = {}

            handlers[ top ].forEach( key => {
                res[ top ][ key ] = ( ...args ) => {
                    return new Promise( resolve => {
                        // console.log( 'Sent', `${top}.${key}`, args )
                        ipcRenderer.invoke( `${top}.${key}`, ...args ).then( resolve )
                    })
                }
            })
        })

        return res
    }

contextBridge.exposeInMainWorld( 'backend', generate())
