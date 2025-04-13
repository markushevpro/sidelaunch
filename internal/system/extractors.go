package system

import (
	"log"
	"strings"
	"syscall"

	"os/exec"
	"net/url"

    "gopkg.in/ini.v1"
)

type UrlData struct {
    Dir string `json:"dir"`
    Url string `json:"url"`
    Icon string `json:"icon"`
}

func ExtractWebLink( path string ) *UrlData {
    inidata, err := ini.Load( path )

    if err != nil {
        log.Printf("Fail to read file: %v", err)
        return &UrlData{}
    }

    section := inidata.Section("InternetShortcut")

    return &UrlData{
        Dir: section.Key("WorkingDirectory").String(),
        Url: section.Key("URL").String(),
        Icon: section.Key("IconFile").String(),
    }
}

func ExtractLink( path string ) string {
	var out strings.Builder
	var oerr strings.Builder

	cmd := exec.Command( ".\\utils\\lnkdata.bat", path )
	cmd.SysProcAttr = &syscall.SysProcAttr{HideWindow: true}
	cmd.Stdout = &out
	cmd.Stderr = &oerr

	err := cmd.Run()

	if err != nil {
		log.Print( err )
		log.Print( oerr.String())
		return `{ "error": "Error fetching lnk from ` + path + `", "err": "` + err.Error() + `", "content": "` + oerr.String() + `" }`
	}

	return out.String()
}

func ExtractIcon( id string, path string ) string {
	var out strings.Builder
	var oerr strings.Builder

	log.Print("Extracting icon")
	log.Print( id )
	log.Print( path )

	cmd := exec.Command( ".\\utils\\geticon.bat", path, id )
	cmd.SysProcAttr = &syscall.SysProcAttr{HideWindow: true}
	cmd.Stdout = &out
	cmd.Stderr = &oerr

	err := cmd.Run()

	if err != nil {
		log.Print( err )
		log.Print( oerr.String())
		return `{ "error": "Error fetching icon from ` + path + `", "err": "` + err.Error() + `", "content": "` + oerr.String() + `" }`
	}

	return out.String()
}

func ExtractFavicon( id string, uri string ) string {
	baseURL, err := url.Parse( uri )

	log.Print( "Extracting icon from: " + uri )

	if err != nil {
		log.Print( err )
		return `{ "error": "Invalid URL: ` + uri + `"}`
	}

	err = findStandartIcons( baseURL, id )

	if err == nil {
		log.Print( "Found standart icon" )
		return `{ "status": "ok" }`
	}

	log.Print( err )

	err = findIconsInHTML( baseURL, id )

	if ( err == nil ) {
		log.Print( "Found icon in html" )
		return `{ "status": "ok" }`
	}

	log.Print( err )
	return `{ "error": "No icons found for url ` + uri + `"}`
}
