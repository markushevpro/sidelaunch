package main

import (
	"embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/windows"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "sidelaunch",
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
		},
		BackgroundColour: &options.RGBA{R: 25, G: 25, B: 25, A: 1},
		OnStartup: app.startup,
		Bind: []interface{}{
			app,
		},
		Debug: options.Debug{
            OpenInspectorOnStartup: true,
        },
        Windows: &windows.Options{
			// ToolWindow: true,
			DisablePinchZoom: true,
            DisableFramelessWindowDecorations: true,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
