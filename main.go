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
		app := NewApp( "", "" )
		err = wails.Run(windows.MainWindow( getBinds( app )))
	} else {
		action := os.Args[1]
		id := os.Args[2]

		app := NewApp( action, id )

		if ( action == "edit" ){
			err = wails.Run(windows.EditWindow( getBinds( app )))
		} else {
			// Dialog window
			err = wails.Run(windows.DialogWindow( getBinds( app )))
		}
	}

	if err != nil {
		println("Error:", err.Error())
	}
}
