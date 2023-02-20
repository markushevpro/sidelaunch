/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const
    { ipcRenderer, contextBridge } = require( 'electron' ),
    beHandlers = {
        'config':  [ 'get', 'read', 'load', 'write' ],
        'fs':      [ 'run', 'appPath', 'read', 'write', 'copy', 'list', 'remove', 'openPath' ],
        'read':    [ 'raw', 'base64', 'string', 'json' ],
        'files':   [ 'extention', 'realPath', 'args', 'dir' ],
        'icons':   [ 'clear', 'remove', 'load', 'update', 'path', 'fromFile', 'base64', 'get', 'thumbnail' ],
        'library': [ 'read', 'load', 'save', 'exist', 'ids' ]
    },
    elHandlers = { 'ui': [ 'movein', 'moveout', 'itemMenu', 'askForMultiple', 'answer', 'hide', 'show' ] },
    onHandlers = [ 'reload', 'reloadItems', 'reloadFolders', 'changeIcon', 'removeFile', 'removeFolder' ],
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
