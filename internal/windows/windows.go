package windows

import (
	"github.com/wailsapp/wails/v2/pkg/options"
)

func MainWindow( binds options.App ) *options.App {
	var res = sharedOptions

	merge( &res, mainWindowOptions )
	merge( &res, binds )

	return &res
}

func EditWindow( binds options.App ) *options.App {
	var res = sharedOptions

	merge( &res, editWindowOptions )
	merge( &res, binds )

	return &res
}

func DialogWindow( binds options.App ) *options.App {
	var res = sharedOptions

	merge( &res, dialogWindowOptions )
	merge( &res, binds )

	return &res
}