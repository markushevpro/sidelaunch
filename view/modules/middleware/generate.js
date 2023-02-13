import fs   from 'fs'
import path from 'path'

import backend from '../../../backend'

const
// eslint-disable-next-line no-undef
    target = path.resolve( __dirname, 'frontend.middleware.js' ),
    template = fs.readFileSync( target ).toString(),
    handlers = {},
    varName = 'beHandlers',
    nextVar = 'elHandlers'

Object.keys( backend ).forEach( top => {
    const topl = top.toLowerCase()

    handlers[ topl ] = []

    Object.keys( backend[ top ]).forEach( key => {
        if ( typeof backend[ top ][ key ] === 'function' ) {
            handlers[ topl ].push( key )
        }
    })
})

fs.writeFileSync( target, template.replace( new RegExp( `${varName} *= *{[^]+},[ \n]*${nextVar}`, 'img' ), `${varName} = ${JSON.stringify( handlers )},\n    ${nextVar}` ))
