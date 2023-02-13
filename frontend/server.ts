import path from 'path'

import express from 'express'

const
    app = express()

app.use( express.static( path.join( __dirname, 'build' )))

app.get( '/*', ( req, res ) => {
    res.sendFile( path.join( __dirname, 'build', 'index.html' ))
})

try {
    app.listen( 9101 )
    console.log( 'Local server is running' )
} catch {
    console.log( 'Local server is runned in dev mode' )
}

export default app
