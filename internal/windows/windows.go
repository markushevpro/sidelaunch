package windows

import (
	"github.com/wailsapp/wails/v2/pkg/options"
)

func MainWindow( binds options.App ) *options.App {
	var res = sharedOptions

	res.SingleInstanceLock = &options.SingleInstanceLock{
		UniqueId: "c28e21cc-bec4-42fe-94dd-d304181f59b5",
	}

	merge( &res, mainWindowOptions )
	merge( &res, binds )

	return &res
}

func EditWindow( id string, binds options.App, onSecond func( data options.SecondInstanceData )) *options.App {
	var res = sharedOptions

	res.SingleInstanceLock = &options.SingleInstanceLock{
		UniqueId: "edit-" + id,
		OnSecondInstanceLaunch: onSecond,
	}

	merge( &res, editWindowOptions )
	merge( &res, binds )

	return &res
}

func DialogWindow( t string, binds options.App, onSecond func( data options.SecondInstanceData )) *options.App {
	var res = sharedOptions

	res.SingleInstanceLock = &options.SingleInstanceLock{
		UniqueId: "dialog-" + t,
		OnSecondInstanceLaunch: onSecond,
	}

	merge( &res, dialogWindowOptions )
	merge( &res, binds )

	return &res
}