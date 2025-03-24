package main

import (
	"embed"
	"os"
	"net/http"
	"fmt"
	"log"
	"strings"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/windows"
)

//go:embed all:frontend/dist
var assets embed.FS

type FileLoader struct {
    http.Handler
}

func NewFileLoader() *FileLoader {
    return &FileLoader{}
}

func (h *FileLoader) ServeHTTP(res http.ResponseWriter, req *http.Request) {
    var cwd, err = os.Getwd()

	if err != nil {		
        res.WriteHeader(http.StatusBadRequest)
        res.Write([]byte(fmt.Sprintf("Could not load cwd")))
	}
    
	var requestedFilename = cwd + "/" + strings.TrimPrefix(req.URL.Path, "/")
    println("Requesting file:", requestedFilename)

    fileData, err := os.ReadFile( requestedFilename)

    if err != nil {
        res.WriteHeader(http.StatusBadRequest)
        res.Write([]byte(fmt.Sprintf("Could not load file %s", requestedFilename)))
    }

    res.Write(fileData)
}


func main() {
	var err error

	if ( len( os.Args ) < 2 ) {
		// Create an instance of the app structure
		app := NewApp( "", "" )
		
		log.Print("[RUN] Main")

		// Create application with options
		err = wails.Run(&options.App{
			Title:  "Sidelaunch",
			Width:  64,
			MinWidth: 0,
			Height: 768,	
			Frameless: true,
			DisableResize: true,
			AlwaysOnTop: true,
			SingleInstanceLock: &options.SingleInstanceLock{
				UniqueId: "c28e21cc-bec4-42fe-94dd-d304181f59b5",
			},
			AssetServer: &assetserver.Options{
				Assets: assets,
				Handler: NewFileLoader(),
			},
			BackgroundColour: &options.RGBA{R: 25, G: 25, B: 25, A: 1},
			OnStartup: app.startup,
			Bind: []interface{}{
				app,
			},
			DragAndDrop: &options.DragAndDrop{
				EnableFileDrop: true,
			},
			Debug: options.Debug{
				OpenInspectorOnStartup: true,
			},
			Windows: &windows.Options{
				ToolWindow: true,
				DisablePinchZoom: true,
				DisableFramelessWindowDecorations: true,
			},
		})
	} else {
		action := os.Args[1]
		id := os.Args[2]
		// Create an instance of the app structure
		app := NewApp( action, id )

		log.Print("[RUN] Action: " + action + " / " + id)

		if ( action == "edit" ){
			err = wails.Run(&options.App{
				Title:  "Sidelaunch",
				Width:  800,
				MinWidth: 0,
				Height: 420,	
				Frameless: false,
				DisableResize: false,
				AlwaysOnTop: false,
				SingleInstanceLock: &options.SingleInstanceLock{
					UniqueId: "c28e21cc-bec4-42fe-94dd-d304181f59b6",
				},
				AssetServer: &assetserver.Options{
					Assets: assets,
					Handler: NewFileLoader(),
				},
				BackgroundColour: &options.RGBA{R: 25, G: 25, B: 25, A: 1},
				OnStartup: app.startup,
				Bind: []interface{}{
					app,
				},
				DragAndDrop: &options.DragAndDrop{
					EnableFileDrop: false,
				},
				Debug: options.Debug{
					OpenInspectorOnStartup: true,
				},
				Windows: &windows.Options{
					ToolWindow: false,
					DisablePinchZoom: true,
					DisableFramelessWindowDecorations: true,
				},
			})
		} else {
			err = wails.Run(&options.App{
				Title:  "Confirmation",
				Width:  565,
				MinWidth: 0,
				Height: 320,	
				Frameless: false,
				DisableResize: true,
				AlwaysOnTop: false,
				SingleInstanceLock: &options.SingleInstanceLock{
					UniqueId: "c28e21cc-bec4-42fe-94dd-d304181f59b7",
				},
				AssetServer: &assetserver.Options{
					Assets: assets,
					Handler: NewFileLoader(),
				},
				BackgroundColour: &options.RGBA{R: 25, G: 25, B: 25, A: 1},
				OnStartup: app.startup,
				Bind: []interface{}{
					app,
				},
				DragAndDrop: &options.DragAndDrop{
					EnableFileDrop: false,
				},
				Debug: options.Debug{
					OpenInspectorOnStartup: true,
				},
				Windows: &windows.Options{
					ToolWindow: false,
					DisablePinchZoom: true,
					DisableFramelessWindowDecorations: true,
				},
			})
		}
	}

	if err != nil {
		println("Error:", err.Error())
	}
}
