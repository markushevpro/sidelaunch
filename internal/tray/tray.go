package tray

import (
	"github.com/energye/systray"
	"sidelaunch/internal/app"
)

func Create( onSettings func() ) func() {
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

		mSettings := systray.AddMenuItem("Settings", "Configure Sidelaunch")
		mSettings.Enable()
		mSettings.Click( onSettings )

		systray.AddSeparator()

		mQuit := systray.AddMenuItem("Close", "Exit application")
		mQuit.Enable()
		mQuit.Click(func() {
			systray.Quit()
		})
	}
}