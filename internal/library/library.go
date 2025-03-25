package library

import (
	"os"
	"io/ioutil"
	"sidelaunch/internal/app"
	"sidelaunch/internal/helpers"
)

func check() {
	os.MkdirAll( app.Folder, os.ModePerm )
	os.MkdirAll( app.Folder + "/icons", os.ModePerm )
}

func Load() string {	
	check()
    content, err := ioutil.ReadFile( app.Path )

    if err != nil {
		return helpers.Error( "Error reading library" )
    }

	return string(content)
}

func Save( data string ) string {
	f, err := os.Create( app.Path )

	if err != nil {
		return helpers.Error( "Error writing library (open)" )
	}

	_, err = f.WriteString( data )

	if err != nil {
        f.Close()
		return helpers.Error( "Error writing library (write)" )
	}

	err = f.Close()

	if err != nil {
		return helpers.Error( "Error writing library (close)" )
	}

	return helpers.Status( "ok" )
}

func GetConfig() string {
    content, err := ioutil.ReadFile( app.Folder + "/config.json")

    if err != nil {
		return helpers.Error( "Error reading config" )
    }

	return string(content)
}