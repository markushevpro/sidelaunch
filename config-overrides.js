/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require( 'path' )

module.exports = {
    webpack: ( config ) => {
        config.resolve.roots = [ path.resolve( __dirname, 'frontend/src' ), __dirname ]
        config.resolve.alias.pages = path.resolve( __dirname, 'frontend/src/pages' )
        config.resolve.alias.components = path.resolve( __dirname, 'frontend/src/components' )
        config.resolve.alias.store = path.resolve( __dirname, 'frontend/src/store' )
        config.resolve.alias.utils = path.resolve( __dirname, 'frontend/src/utils' )
        config.resolve.alias.service = path.resolve( __dirname, 'frontend/src/service' )

        config.resolve.alias.tools = path.resolve( __dirname, 'tools' )
        config.resolve.alias.models = path.resolve( __dirname, 'models' )

        return config
    },
    paths: ( paths ) => {
        paths.appPath = path.resolve( __dirname, 'frontend' )
        paths.appBuild = path.resolve( __dirname, 'frontend/build' )
        paths.appPublic = path.resolve( __dirname, 'frontend/public' )
        paths.appHtml = path.resolve( __dirname, 'frontend/public/index.html' )
        paths.appIndexJs = path.resolve( __dirname, 'frontend/src/index.tsx' )
        paths.appSrc = path.resolve( __dirname, 'frontend/src' )

        return paths
    },
}
