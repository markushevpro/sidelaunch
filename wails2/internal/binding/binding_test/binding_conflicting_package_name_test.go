package binding_test

import (
	"io/fs"
	"os"
	"testing"

	"github.com/wailsapp/wails/v2/internal/binding"
	"github.com/wailsapp/wails/v2/internal/binding/binding_test/binding_test_import/float_package"
	"github.com/wailsapp/wails/v2/internal/binding/binding_test/binding_test_import/int_package"
	"github.com/wailsapp/wails/v2/internal/binding/binding_test/binding_test_import/map_package"
	"github.com/wailsapp/wails/v2/internal/binding/binding_test/binding_test_import/uint_package"
	"github.com/wailsapp/wails/v2/internal/logger"
)

const expectedBindings = `// Cynhyrchwyd y ffeil hon yn awtomatig. PEIDIWCH Â MODIWL
// This file is automatically generated. DO NOT EDIT
import {float_package} from '../models';
import {int_package} from '../models';
import {map_package} from '../models';
import {uint_package} from '../models';

export function StartingWithFloat(arg1:float_package.SomeStruct):Promise<void>;

export function StartingWithInt(arg1:int_package.SomeStruct):Promise<void>;

export function StartingWithMap(arg1:map_package.SomeStruct):Promise<void>;

export function StartingWithUint(arg1:uint_package.SomeStruct):Promise<void>;
`

type HandlerTest struct{}

func (h *HandlerTest) StartingWithInt(_ int_package.SomeStruct)     {}
func (h *HandlerTest) StartingWithFloat(_ float_package.SomeStruct) {}
func (h *HandlerTest) StartingWithUint(_ uint_package.SomeStruct)   {}
func (h *HandlerTest) StartingWithMap(_ map_package.SomeStruct)     {}

func TestConflictingPackageName(t *testing.T) {
	// given
	generationDir := t.TempDir()

	// setup
	testLogger := &logger.Logger{}
	b := binding.NewBindings(testLogger, []interface{}{&HandlerTest{}}, []interface{}{}, false, []interface{}{})

	// then
	err := b.GenerateGoBindings(generationDir)
	if err != nil {
		t.Fatalf("could not generate the Go bindings: %v", err)
	}

	// then
	rawGeneratedBindings, err := fs.ReadFile(os.DirFS(generationDir), "binding_test/HandlerTest.d.ts")
	if err != nil {
		t.Fatalf("could not read the generated bindings: %v", err)
	}

	// then
	generatedBindings := string(rawGeneratedBindings)
	if generatedBindings != expectedBindings {
		t.Fatalf("the generated bindings does not match the expected ones.\nWanted:\n%s\n\nGot:\n%s", expectedBindings, generatedBindings)
	}
}
