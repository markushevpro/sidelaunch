package main 
 
import ( 
	"os"
	"log"
	"path/filepath"
	"strings"
	"os/exec"
)
 
func main() {     
    files, err := os.ReadDir("./bin")
	dir, errDir := os.Getwd()

    if err != nil {
        log.Fatal(err)
    }

	if ( errDir != nil ){
		log.Fatal( errDir )
	}
 
    for _, file := range files {
		filename := file.Name()
		if strings.ToLower(filepath.Ext(filename)) == ".exe" {
			cmd := exec.Command( dir + "/bin/" + filename )

			if err := cmd.Run(); err != nil {
				log.Fatal(err)
			}
		}
    }
} 