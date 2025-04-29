package main

import (
	"embed"
	"os"
	"context"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"

	"sidelaunch/internal/fileloader"
	"sidelaunch/internal/windows"
)

//go:embed all:frontend/dist
var assets embed.FS

func getBinds( app *App, shutdown func( ctx context.Context ) ) options.App {
	return options.App{
		OnStartup: app.startup,
		OnShutdown: shutdown,
		Bind: []interface{}{
			app,
		},
		AssetServer: &assetserver.Options{
			Assets: assets,
			Handler: fileloader.New(),
		},
	}
}

func main() {
	var err error
	var reloadEmpty = func( _ context.Context ){}

	if ( len( os.Args ) < 2 ) {
		// Main window
		app := NewApp( "", "" )
		err = wails.Run( windows.MainWindow( getBinds( app, reloadEmpty ), app.OnReload ))
	} else {
		action := os.Args[1]

		if ( action == "reload" ) {
			app := NewApp( "", "" )
			err = wails.Run( windows.MainWindow( getBinds( app, reloadEmpty ), app.OnReload ))			
		} else if ( action == "edit" || action == "editurl" ){
			id := os.Args[2]
			app := NewApp( action, id )

			err = wails.Run( windows.EditWindow( id, getBinds( app, func( _ context.Context ){ app.Reload( "library", id )} ), app.Focus ))
		} else if ( action == "settings" ) {
			app := NewApp( action, "" )
			err = wails.Run( windows.SettingsWindow( getBinds( app, func( _ context.Context ){ app.Reload( "config", "" )} ), app.Focus ))
		} else {
			// Dialog window
			id := os.Args[2]
			app := NewApp( action, id )

			err = wails.Run( windows.DialogWindow( "remove-" + id, getBinds( app, func( _ context.Context ){ app.Reload( "library", id )} ), app.Focus ))
		}
	}

	if err != nil {
		println("Error:", err.Error())
	}
}
