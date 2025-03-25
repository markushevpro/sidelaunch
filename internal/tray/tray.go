package tray

import (
	"os"
	"github.com/energye/systray"
	"sidelaunch/internal/app"
)

func Create() func() {
	return func() {
		systray.SetIcon( app.Icon )
		systray.SetTitle( "Sidelaunch" )

		systray.SetOnClick(func(menu systray.IMenu) {
			menu.ShowMenu()
		})

		systray.SetOnRClick(func(menu systray.IMenu) {
			menu.ShowMenu()
		})
		
		systray.CreateMenu()

		mQuit := systray.AddMenuItem("Close", "Exit application")
		mQuit.Enable()
		mQuit.Click(func() {
			os.Exit(0)
		})
	}
}