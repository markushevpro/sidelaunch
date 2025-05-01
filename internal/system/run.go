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
	var args = []string{ "/c", "start", path }

	if ( params != "" ) {
		args = append( args, params )
	}

	log.Print("[FILE] ", args)

	instance := exec.Command("cmd", args...)	
	instance.SysProcAttr = &syscall.SysProcAttr{ HideWindow: true }
	instance.Start()
}

func OpenExe( path string, cwd string, params string ) {
	log.Print("[EXE] ", path + " " + params, "(working dir: ", cwd, ")" )

	var args = []string{ path }

	if ( cwd != "" ) {
		args = append( args, cwd )
	} else {
		args = append( args, filepath.Dir( path ))
	}

	if ( params != "" ) {
		args = append( args, params )
	}

	cmd := exec.Command( ".\\utils\\runner.bat", args... )
	cmd.SysProcAttr = &syscall.SysProcAttr{ HideWindow: true }
	cmd.Start()
}

func OpenFile( path string, cwd string, params string ) {
    if ( filepath.Ext( path ) != ".exe" || filepath.Base( path ) == "cmd.exe" ) {
		OpenAny( path, params )
        return
    }

	OpenExe( path, cwd, params )
}