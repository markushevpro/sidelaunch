package system

import (
	"context"
	"strings"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"sidelaunch/internal/helpers"
)

func Error( ctx context.Context, dlgtype runtime.DialogType, title string, message string ) {
	runtime.MessageDialog( ctx, runtime.MessageDialogOptions{
		Type: dlgtype,
		Title: title,
		Message: message,
	})
}

func FileDialog( ctx context.Context, title string, accept []runtime.FileFilter ) string {
	file, err := runtime.OpenFileDialog( ctx, runtime.OpenDialogOptions{
		Title: title,
		Filters: accept,
		ShowHiddenFiles: false,
		CanCreateDirectories: false,
		ResolvesAliases: true,
		TreatPackagesAsDirectories: false,
	})

	if err != nil && file != "" {
		return helpers.Error( err.Error() )
	}

	return "{ \"path\": \"" + strings.Replace( file, "\\", "\\\\", -1 ) + "\" }"
}

func DirDialog( ctx context.Context, title string ) string {
	file, err := runtime.OpenDirectoryDialog( ctx, runtime.OpenDialogOptions{
		Title: title,
		ShowHiddenFiles: false,
		CanCreateDirectories: true,
		ResolvesAliases: true,
		TreatPackagesAsDirectories: false,
	})

	if err != nil && file != "" {
		return helpers.Error( err.Error() )
	}

	return "{ \"path\": \"" + strings.Replace( file, "\\", "\\\\", -1 ) + "\" }"
}