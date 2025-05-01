package system

import (
	"log"
	"errors"
	"strings"

	"os"
	"os/exec"

	"io/ioutil"
	"path/filepath"
)

func CleanUpIcons( ids []string ) {
	var path = "./data/icons"
	var cwd, _ = os.Getwd()

	idMap := make(map[string]bool)
	for _, id := range ids {
		idMap[id] = true
	}

	files, err := os.ReadDir(path)
	if err != nil {
		log.Print( err )
		return
	}

	for _, file := range files {
		if file.IsDir() {
			continue
		}

		fileName := file.Name()
		ext := filepath.Ext( fileName )
		id := strings.TrimSuffix( fileName, ext )

		if !idMap[id] {
			filePath := filepath.Join( cwd, path, fileName )
			err := os.Remove(filePath)
			if err != nil {
				log.Print( err )
			} else {
				log.Printf("Removed unused icon: %s\n", filePath)
			}
		}
	}
}

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
    var cwd, err = os.Getwd()
	var realPath = path

	if ( strings.HasPrefix( path, "/" )) {
		if ( err != nil ) {
			return `{ "error": "Cannot get working directory" }`
		}

		realPath = filepath.Join( cwd, path )
	}

	data, err := ioutil.ReadFile( realPath )

	if err != nil {
		log.Print( err )
		return `{ "error": "Error fetching icon from ` + path + `", "err": "` + err.Error() + `" }`
	}
	
	err = ioutil.WriteFile( dest, data, 0644 )

    if err != nil {
		log.Print( err )
		return `{ "error": "Error saving icon from ` + path + ` to ` + dest + `", "err": "` + err.Error() + `" }`
    }

	return "{}"
}