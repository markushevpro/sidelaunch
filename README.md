<br />
<br />

<h2 align="center">
    <img alt="Sidelaunch" src="https://raw.githubusercontent.com/markushevpro/sidelaunch/master/assets/logo.png" height="96" />
    <br/>
    <br/>
    Sidelaunch
  <br/>
</h2>

<h3 align="center">
    Additional Launchbar for Windows 10 & 11
</h3>

<p align="center">
    <i>This app is built on top of Wails.io, which is cross-platform, so it's theoretically possible to support other systems. If you want support for a specific operating system, please <a href="https://github.com/markushevpro/sidelaunch/issues/new">create an issue</a> .</i>
</p>


<br />

<p align="center">
    <img alt="Go / Wails v2" src="https://img.shields.io/badge/Go-Wails_v2-red" />
    <img alt="React / Vite" src="https://img.shields.io/badge/React-Vite-blue" />
    <img alt="Static Badge" src="https://img.shields.io/badge/UFO-Architecture-green" />
    <img alt="GitHub License" src="https://img.shields.io/github/license/markushevpro/sidelaunch" />
    <img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/t/markushevpro/sidelaunch" />
</p>

## Features
- Additional sidebar on the left
- Drag'n'Drop interface
- Organize files into folders
- Accept any files and user protocols ([*](#custom-protocol-support))
- Automatic parsing of .lnk and .url files
- Customize icons for links and folders
- Customize the "current working directory" and cli parameters for each shortcut if necessary
- Support for multiple monitors
- Portable - no installation required

<p align="center">
    <br/><br/>
    <img alt="Sidelaunch Screenshot" src="https://raw.githubusercontent.com/markushevpro/sidelaunch/master/assets/screenshot.png" />
    <br/><br/>
</p>

## Installing
Just download a [release](https://github.com/markushevpro/sidelaunch/releases/latest) and unzip to any folder you like.

## Updating
Download separate [executable](https://github.com/markushevpro/sidelaunch/releases/latest) and replace `sidelaunch.exe` in your Sidelaunch folder.

## Using Sidelaunch
Intuitive interface (I hope) with mouse control only.

- **Appearance**<br/>
The app floats on the left edge. By default, to make it appear, simply move the mouse to the left edge of the left-most screen. If the mouse is not hovering over the window, it hides after a configurable timeout. Can be fixed (no hiding). See [Configuration](#configuration) section below.

- **Adding files**<br/>
Drag a file into the application window. Or click the "+" button at the bottom and then click the "File" icon.

- **Adding URLs**<br/>
Click the "+" button at the bottom and then click the "Web" icon. An editing window will appear, just paste the URL and save.

- **Sorting files**<br/>
Drag an added item inside the window.

- **Moving files into a folder**<br/>
Drag an item into the specified folder.

- **Moving files into the parent folder**<br/>
While inside a folder, drag an item onto "Back button" at the top of the screen

- **Sorting folders**<br/>
Move folders while holding down the "Ctrl" key.

- **Adding a new folder**<br/>
Click the "+" button at the very bottom of the main window and then click the "Directory" icon. You will automatically go to the created folder.

- **Deleting**<br/>
Drag the item into the "delete zone" at the very bottom of the main window (appears instead of the "Add" button when you start dragging).

- **Confirming folder deletion**<br/>
A separate pop-up window with options: completely delete or move the contents to the parent folder.

- **Editing information**<br/>
Right-click the item, wait for a separate pop-up window.

- **Close application**<br/>
Click on the Sidelaunch icon in system tray, then click "Close".

- **Forced restart**<br/>
If the application freezes, is not displayed correctly, or the tray menu is missing, just launch it again to close the old version and open the new one. _Does not affect open editing, deleting, and settings windows._

## Notices

### Known bugs
- For some reason, when using sleep/hibernation mode, the tray menu stops showing. Just restart the application by launching it again.

### Custom Protocol Support
When creating a "Web" link, you can use any link protocol, not just "http" or "https".

### Configuration
Click on the Sidelaunch icon in the tray and select "Settings". In the window that opens, you can easily change the supported settings.

Or you can change some parameters in the `data/config.json` file. Not all of them are working, but just a reserve for the future.

_Default values ​​are specified below_

- **fixed**: `false` - set "true" for app be always visible
- **position**: `left` - currently only this value is supported
- **iconSize**: `32` - Value from 16 to 48. Other values ​​will be adjusted to this range
- **hideTimeout**: `0.5` - timeout value for hiding in seconds

## Stack
### Frontend
- TypeScript
- React
- Vite
- [zustand](https://github.com/pmndrs/zustand)
### Backend
- [Wails v2](https://github.com/wailsapp/wails)
- [energye/systray](https://github.com/energye/systray)
- [dario.cat/mergo](https://github.com/darccio/mergo)
- [gopkg.in/ini.v1](https://github.com/go-ini/ini/tree/v1.67.0)
- [biessek/golang-ico](https://github.com/biessek/golang-ico)

<br/>
<hr />
<br/>

[@aturbidflow](https://t.me/aturbidflow) – Telegram