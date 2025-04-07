package windows

import (
	"github.com/wailsapp/wails/v2/pkg/options"
)

const uniq = "c28e21cc-bec4-42fe-94dd-d304181f59b5"

func MainWindow( binds options.App ) *options.App {
	var res = sharedOptions

	res.SingleInstanceLock = &options.SingleInstanceLock{
		UniqueId: uniq,
	}

	merge( &res, mainWindowOptions )
	merge( &res, binds )

	return &res
}

func SettingsWindow( binds options.App, onSecond func( data options.SecondInstanceData )) *options.App {
	var res = sharedOptions

	res.SingleInstanceLock = &options.SingleInstanceLock{
		UniqueId: uniq + "-settings",
		OnSecondInstanceLaunch: onSecond,
	}

	merge( &res, settingsWindowOptions )
	merge( &res, binds )

	return &res
}

func EditWindow( id string, binds options.App, onSecond func( data options.SecondInstanceData )) *options.App {
	var res = sharedOptions

	res.SingleInstanceLock = &options.SingleInstanceLock{
		UniqueId: uniq + "-edit-" + id,
		OnSecondInstanceLaunch: onSecond,
	}

	merge( &res, editWindowOptions )
	merge( &res, binds )

	return &res
}

func DialogWindow( t string, binds options.App, onSecond func( data options.SecondInstanceData )) *options.App {
	var res = sharedOptions

	res.SingleInstanceLock = &options.SingleInstanceLock{
		UniqueId: uniq + "-dialog-" + t,
		OnSecondInstanceLaunch: onSecond,
	}

	merge( &res, dialogWindowOptions )
	merge( &res, binds )

	return &res
}