package main

import (
	"embed"
	"os"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"

	"sidelaunch/internal/fileloader"
	"sidelaunch/internal/windows"
)

//go:embed all:frontend/dist
var assets embed.FS

func getBinds( app *App ) options.App {
	return options.App{
		OnStartup: app.startup,
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

	if ( len( os.Args ) < 2 ) {
		// Main window
		app := NewApp( "", "" )
		err = wails.Run( windows.MainWindow( getBinds( app )))
	} else {
		action := os.Args[1]

		if ( action == "edit" ){
			id := os.Args[2]
			app := NewApp( action, id )

			err = wails.Run( windows.EditWindow( id, getBinds( app ), app.Focus ))
		} else if ( action == "settings" ) {
			app := NewApp( action, "" )
			err = wails.Run( windows.SettingsWindow( getBinds( app ), app.Focus ))
		} else {
			// Dialog window
			id := os.Args[2]
			app := NewApp( action, id )

			err = wails.Run( windows.DialogWindow( "remove-" + id, getBinds( app ), app.Focus ))
		}
	}

	if err != nil {
		println("Error:", err.Error())
	}
}
