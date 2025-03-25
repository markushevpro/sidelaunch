package fileloader

import (
	"os"
	"fmt"
	"strings"
	"net/http"
)

type Loader struct {
    http.Handler
}

func (h *Loader) ServeHTTP(res http.ResponseWriter, req *http.Request) {
    var cwd, err = os.Getwd()

	if err != nil {		
        res.WriteHeader(http.StatusBadRequest)
        res.Write([]byte(fmt.Sprintf("Could not load cwd")))
	}
    
	var requestedFilename = cwd + "/" + strings.TrimPrefix(req.URL.Path, "/")
    println("Requesting file:", requestedFilename)

    fileData, err := os.ReadFile( requestedFilename)

    if err != nil {
        res.WriteHeader(http.StatusBadRequest)
        res.Write([]byte(fmt.Sprintf("Could not load file %s", requestedFilename)))
    }

    res.Write(fileData)
}

func New() *Loader {
    return &Loader{}
}