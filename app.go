package main

import (
	"context"
	"syscall"

	osRuntime "runtime"

	"os"
	"os/exec"
	
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"github.com/wailsapp/wails/v2/pkg/options"
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

        systray.Run(tray.Create( a.ShowSettings ), func() {
			os.Exit(0)
		})
    }
}

func (a *App) rerun( args ...string ) {
	self, _ := os.Executable()
	// log.Print(self)
	// log.Print(args)
    exec.Command(self, args... ).Start()
}

func (a *App) Restart( data options.SecondInstanceData ) {
	self, err := os.Executable()

	if err != nil {
		return
	}

	args := os.Args
	env := os.Environ()

	if osRuntime.GOOS == "windows" {
		cmd := exec.Command(self, args[1:]...)
		cmd.Stdout = os.Stdout
		cmd.Stderr = os.Stderr
		cmd.Stdin = os.Stdin
		cmd.Env = env
		err := cmd.Start()
		if err == nil {

			os.Exit(0)
		}
	}

	syscall.Exec(self, args, env)
}

func (a *App) GetPageData() *app.PageData {
    return &app.PageData{
        Page: a.page,
        Id: a.id,
    }
}

func (a *App) Focus( data options.SecondInstanceData ) {
    runtime.WindowUnminimise(a.ctx)
    runtime.Show(a.ctx)
}

func (a *App ) OnReload( data options.SecondInstanceData ) {
	runtime.EventsEmit( a.ctx, "reload", data.Args )
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

func (a *App) ShowInExplorer( path string, dir bool ) {
	system.ShowInExplorer( path, dir )
}

func (a *App) LoadConfig() string {
	return library.GetConfig()
}

func (a *App ) SaveConfig( data string ) string {
	return library.SaveConfig( data )
}

func (a *App) LoadLibrary() string {
	return library.Load()
}

func (a *App) SaveLibrary( data string ) string {
	return library.Save( data )
}

func (a *App) OpenURL( url string ) {
	system.OpenURL( url )
}

func (a *App) RunExecutable( path string, cwd string, params string ) {
	system.OpenFile( path, cwd, params )
}

func (a *App) CheckFile( path string ) string {
	return system.CheckFile( path )
}

func (a *App) CheckURL( url string ) string {
	return system.CheckURL( url )
}

func (a *App) Reload( what string, id string ) {
	a.rerun( "reload", what, id )
}

func (a *App) ShowSettings() {
	a.rerun( "settings" )
}

func (a *App) EditItem( id string ) {
	a.rerun( "edit", id )
}

func (a *App) EditURLItem( id string ) {
	a.rerun( "editurl", id )
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

func (a *App) ExtractFavicon( id string, uri string ) string {
	return system.ExtractFavicon( id, uri )
}

func (a *App ) SaveIcon( id string, path string ) string {
	return system.SaveIcon( id, path )
}