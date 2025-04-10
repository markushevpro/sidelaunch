package system

import (
	"log"
	"errors"

	"os"
	"os/exec"

	"io/ioutil"
)

func ShowInExplorer( path string, dir bool ) {	
	if ( dir ) {
		exec.Command( "explorer", path ).Run()
	} else {
		exec.Command( "explorer", "/select,", path ).Run()
	}
}

func CheckFile( path string ) string {
	if _, err := os.Stat( path ); err == nil {
		return ""
	} else if errors.Is(err, os.ErrNotExist) {
		return "Not found"	  
	} else {
		return "Unknown error"
	}
}

func SaveIcon( id string, path string ) string {
	var dest = "./data/icons/" + id + ".png"

	data, err := ioutil.ReadFile( path )

	if err != nil {
		log.Print( err )
		return "{ \"error\": \"Error fetching icon from " + path + "\", \"err\": \"" + err.Error() + "\" }"
	}
	
	err = ioutil.WriteFile( dest, data, 0644 )

    if err != nil {
		log.Print( err )
		return "{ \"error\": \"Error saving icon from " + path + " to " + dest + "\", \"err\": \"" + err.Error() + "\" }"
    }

	return "{}"
}