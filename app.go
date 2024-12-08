package main

import (
	"context"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"io/ioutil"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	runtime.WindowSetSize( ctx, 0, 0 )
}

/* =========== JS API */

/* Library */

func (a *App) LoadLibrary() string {
    content, err := ioutil.ReadFile("./data/data.json")

    if err != nil {
		return "{ \"error\": \"Error reading library\" }"
    }

	return string(content)
}

/* Config */

func (a *App) LoadConfig() string {
    content, err := ioutil.ReadFile("./data/config.json")

    if err != nil {
		return "{ \"error\": \"Error reading config\" }"
    }

	return string(content)
}
