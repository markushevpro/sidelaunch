package main

import (
	"context"
	"log"

	"os"
	"os/exec"
	
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"github.com/energye/systray"

	"sidelaunch/internal/app"
	"sidelaunch/internal/tray"
	"sidelaunch/internal/library"
	"sidelaunch/internal/system"
)

type App struct {
	ctx context.Context
    page string
    id string
}

// NewApp creates a new App application struct
func NewApp( page string, id string ) *App {
	return &App{
        page: page,
        id: id,
    }
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx

    if ( a.page == "" ) {
        runtime.WindowSetSize( ctx, 0, 0 )

        runtime.OnFileDrop(a.ctx, func(x, y int, paths []string) {
        	runtime.EventsEmit(a.ctx, "filedrop", paths )
        })

        systray.Run(tray.Create(), func() {})
    }
}

func (a *App) rerun( args ...string ) {
	self, _ := os.Executable()
	log.Print(self)
    exec.Command(self, args... ).Start()
}

func (a *App) GetPageData() *app.PageData {
    return &app.PageData{
        Page: a.page,
        Id: a.id,
    }
}

/* FLAT API */

func (a *App) SystemError( dlgtype runtime.DialogType, title string, message string ) {
	system.Error( a.ctx, dlgtype, title, message )
}

func (a *App) OpenFile( title string, accept []runtime.FileFilter ) string {
	return system.FileDialog( a.ctx, title, accept )
}

func (a *App) OpenDir( title string ) string {
	return system.DirDialog( a.ctx, title )
}

func (a *App) LoadLibrary() string {
	return library.Load()
}

func (a *App) SaveLibrary( data string ) string {
	return library.Save( data )
}

func (a *App) LoadConfig() string {
	return library.GetConfig()
}

func (a *App) OpenURL( url string ) {
	system.OpenURL( url )
}

func (a *App) RunExecutable( path string, params string ) {
	system.OpenFile( path, params )
}

func (a *App) CheckFile( path string ) string {
	return system.CheckFile( path )
}

func (a *App) CheckURL( url string ) string {
	return system.CheckURL( url )
}

func (a *App) EditItem( id string ) {
	a.rerun( "edit", id )
}

func (a *App) ConfirmFolderRemove( id string ) {
	a.rerun( "removefolder", id )
}

func (a *App) ReadUrlFile( path string ) *system.UrlData {
	return system.ExtractWebLink( path )
}

func (a *App) ExtractLink( path string ) string {
	return system.ExtractLink( path )
}

func (a *App) ExtractIcon( id string, path string ) string {
	return system.ExtractIcon( id, path )
}

func (a *App ) SaveIcon( id string, path string ) string {
	return system.SaveIcon( id, path )
}