package system

import (
	"fmt"
	"bytes"
	"image/png"
	"io"
	"net/http"
	"strings"

	"github.com/biessek/golang-ico"
)

func isImage( resp *http.Response ) bool {
	contentType := resp.Header.Get("Content-Type")
	return ( contentType == "application/octet-stream" || ( strings.HasPrefix( contentType, "image/" ) && contentType != "image/svg+xml" ))
}

func isIco( resp *http.Response ) bool {
	contentType := resp.Header.Get("Content-Type")

	if contentType == "image/x-icon" || contentType == "image/vnd.microsoft.icon" {
		return true
	}

	return false
}

func convertIcoToPng( icoData io.Reader ) ( []byte, error ) {
	imgs, err := ico.DecodeAll( icoData )

	if err != nil {
		return nil, fmt.Errorf("failed to read ico data: %v", err)
	}

	var biggest int = 0

	for index, _ := range imgs {
		cur := imgs[index].Bounds().Size()
		big := imgs[biggest].Bounds().Size()

		if cur.X * cur.Y > big.X * big.Y {
			biggest = index
		}
	}

	var buf bytes.Buffer

	err = png.Encode(&buf, imgs[biggest])

	if err != nil {
		return nil, fmt.Errorf("failed to encode png: %v", err)
	}

	return buf.Bytes(), nil
}