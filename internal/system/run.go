package system

import (
	"syscall"
	"log"
	"os/exec"
    "path/filepath"
	"net/http"
)

func OpenURL( url string ) {
	var args = []string{ "/c", "start", url }

	log.Print("[URL]", args)

	instance := exec.Command("cmd", args...)
	instance.SysProcAttr = &syscall.SysProcAttr{ HideWindow: true }
	instance.Start()
}

func CheckURL( url string ) string {
	response, err := http.Get(url)

	if err != nil {
		return err.Error()
	}
	
	defer response.Body.Close()
	return response.Status
}

func OpenAny( path string, params string ) {
	var args = []string{ "/c", "start", path, params }	

	log.Print("[FILE]", args)

	instance := exec.Command("cmd", args...)	
	instance.SysProcAttr = &syscall.SysProcAttr{ HideWindow: true }
	instance.Start()
}

func OpenExe( path string, params string ) {
	log.Print("[EXE]", path + " " + params )
	exec.Command(path + " " + params).Start()
}

func OpenFile( path string, params string ) {
    if ( filepath.Ext( path ) != ".exe" || filepath.Base( path ) == "cmd.exe" ) {
		OpenAny( path, params )
        return
    }

	OpenExe( path, params )
}