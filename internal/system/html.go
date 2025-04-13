package system

import (
	"strings"
	"fmt"
	"io"
	"os"
	"log"

	"net/http"
	"net/url"

	"golang.org/x/net/html"
)

// TODO: Refactor

func findStandartIcons( baseURL *url.URL, id string ) error {
	commonIconPaths := []string{
		"/favicon.png",
		"/apple-touch-icon.png",
		"/icon.png",
		"/logo.png",
		"/favicon.ico",
	}

	return tryToSaveIcon( baseURL, commonIconPaths, id )
}

func findIconsInHTML( baseURL *url.URL, id string ) error {
	var icons []string

	resp, err := http.Get( baseURL.String() )

	if err != nil {
		return fmt.Errorf("failed to fetch URL: %v", err)
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("HTTP request failed with status: %s", resp.Status)
	}

	doc, err := html.Parse( resp.Body )
	
	if err != nil {
		return fmt.Errorf("failed to parse HTML: %v", err)
	}

	var f func( *html.Node )

	f = func( n *html.Node ) {
		if n.Type == html.ElementNode && n.Data == "link" {
			icon := extractIconFromTag( n, baseURL )

			if icon != "" {
				icons = append( icons, icon )
			}
		}

		for c := n.FirstChild; c != nil; c = c.NextSibling {
			f(c)
		}
	}

	f( doc )

	return tryToSaveIcon( baseURL, icons, id )
}

func extractIconFromTag( n *html.Node, baseURL *url.URL ) string {
	var rel, href string

	for _, attr := range n.Attr {
		switch attr.Key {
			case "rel":
				rel = attr.Val
			case "href":
				href = attr.Val
		}
	}

	if !strings.Contains(rel, "icon") || href == "" {
		return ""
	}

	iconURL, err := url.Parse( href )

	if err != nil {
		return ""
	}

	iconURL = baseURL.ResolveReference( iconURL )

	return iconURL.String()
}

func tryToSaveIcon( baseURL *url.URL, paths []string, id string ) error {
	for _, iconPath := range paths {
		var err error

		iconURL := *baseURL
		loadPath := iconPath

		absolute := strings.HasPrefix( iconPath, "http" )

		if absolute == false {
			loadPath, err = url.JoinPath( iconURL.String(), iconPath )
		}

		log.Print( iconPath, " ", loadPath, " ", absolute )

		if err != nil {
			log.Print( err )
			continue
		}

		log.Print( loadPath )

		resp, err := http.Head( loadPath )

		if err != nil {
			log.Print( err )
			continue
		}

		defer resp.Body.Close()

		if resp.StatusCode == http.StatusOK {
			err := downloadAndSaveIcon( loadPath, "./data/icons/" + id + ".png" )

			if err != nil {
				log.Print( err )
				continue
			}

			return nil
		} else {
			log.Print( "Http wrong: " + string(resp.StatusCode) )
			continue
		}
	}

	return fmt.Errorf("No icons found in provided paths")
}

func downloadAndSaveIcon( iconURL string, filename string) error {

	resp, err := http.Get( iconURL )
	
	if err != nil {
		return fmt.Errorf("failed to download icon: %v", err)
	}

	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("HTTP request failed with status: %s", resp.Status)
	}

	if ( isIco( resp )) {		
		pngData, err := convertIcoToPng( resp.Body )

		if err != nil {
			return err
		}

		err = os.WriteFile( filename, pngData, 0644 )

		if err != nil {
			return err
		}
	} else if ( isImage( resp )) {
		file, err := os.Create( filename )

		if err != nil {
			return fmt.Errorf("failed to create file: %v", err)
		}
	
		defer file.Close()
		
		_, err = io.Copy( file, resp.Body )

		if err != nil {
			return fmt.Errorf("failed to save icon: %v", err)
		}
	} else {		
		return fmt.Errorf("not an image")
	}

	return nil
}