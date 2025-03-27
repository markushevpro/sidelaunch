package windows

import (
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/windows"
)

var sharedOptions = options.App{
	Title:  "Sidelaunch",
	Width: 0,
	Height: 0,
	MinWidth: 0,
	Frameless: false,
	DisableResize: true,
	AlwaysOnTop: false,
	SingleInstanceLock: &options.SingleInstanceLock{
		UniqueId: "0",
	},
	DragAndDrop: &options.DragAndDrop{
		EnableFileDrop: false,
	},
	BackgroundColour: &options.RGBA{R: 25, G: 25, B: 25, A: 1},
	Debug: options.Debug{
		OpenInspectorOnStartup: true,
	},
	Windows: &windows.Options{
		ToolWindow: false,
		DisablePinchZoom: true,
		DisableFramelessWindowDecorations: true,
	},
}

var mainWindowOptions = options.App{
	Width:  64,
	Height: 768,	
	Frameless: true,
	AlwaysOnTop: true,
	DragAndDrop: &options.DragAndDrop{
		EnableFileDrop: true,
	},
	Windows: &windows.Options{
		ToolWindow: true,
		DisablePinchZoom: true,
		DisableFramelessWindowDecorations: true,
	},
}

var editWindowOptions = options.App{
	Width:  800,
	Height: 420,	
	DisableResize: false,
}

var dialogWindowOptions = options.App{
	Title:  "Confirmation",
	Width:  565,
	Height: 320,
}