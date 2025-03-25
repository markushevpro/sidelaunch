package windows

import (
	"log"
	"dario.cat/mergo"
	"github.com/wailsapp/wails/v2/pkg/options"
)


func merge( base *options.App, override options.App ) *options.App {
	var dst = base
	var src = override

	if err := mergo.Merge(dst, src, mergo.WithOverride); err != nil {
		log.Fatal( err )
	}

	return dst

}