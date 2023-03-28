import electron, { Tray, Menu, nativeImage } from 'electron'

class TrayIcon {

    ref?: Electron.Tray

    init = () => {
        this.ref = new Tray( nativeImage.createFromDataURL( 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAhCAYAAABX5MJvAAADwElEQVRYhb3XT2zbVBwH8O9z4iQda7qtVKEoFLdRMooYAsEhYj24UxCDTSJCk9iBgjQOIHGhEpM4IM07cGGHSFx24oA47DKJMk1bKdMS2k5006SKQ1DXrqmXlpFkdNRpSesltjlkNo3z3PqP4HdKXp5/+uT3nn9+BjyGkMns85qD8QQ4n+HCPZ2zme++OeMlD/EE6OzMQgPXTESE0ZEPz7rJ5XNzEc+nub9+r2Qjz/RybIA1ho++8zZ+/P7Sz/85gufTHMto2fqjOlculhDp64VXiKM9oQNAmkuwuVGDUv4DLKMZczRogtM9YhthBgDA4WQcr73CIbZX8wSxhaABXng+iqFkAgAQYOAJsiuCBggGWXSFO1rmeYHsiLBagngsQp3vFmKJsALoS2AVbiDUW1Q4n+GeffKp7PLyChWwsFhGKMiiL9pNT0qALhaQ6oCqNfthz/4D/ODAi5iavN52+7ZVQu+Eo599wo2MvAsAiL+U2LUC5ggwwF5/83M00osTr7+FYkEUUvzxtor4aQC9Fb/3/kk8cSCMe1IJgNpyoSw3bGF69nfjROpN4zvx+YQUfxzXcpeNFm9UwgzQ4+BgnJq88qBqCxEMBNrGHkOMijA7AayiK9yB4soqLlycwe3ZJRRXViFVa7ZQNIhfyGT2OQEAwFAygb5oN6TqJqRqDVcmfoVU3cRQMoHDSXrlrCBv8MckRhgdXVMU5VtHfwNAX7Qbhx53zY9PHUE8FsH0zLyjHESFSMCOMQBw+oOPBEVVXJ0F9Hj15X7HAEYjw+O5MdHYmFaQBw9XbSXtCu+hjsuP5B0BgKlPmCE/XLqCz0+fwUZ1wxaEFhMTk/jiy3OWAIDSMX8au5xLpY+RUuE+/9W5r8FoBOViCYcSTyMUYs3TjZDlBm7PLrU0tes38vjlZh53Fgq4XyphY21NrEl/twCoCB1SqayTPcEOPsQGAFXD3UIF8VgEoSAdYkZcncrj2o288fvc/F1xZfXP4ZnpcdF8reUDbHpyXGB8vrOEEBAAUrWGCxdv2uoHV6fyGJ/6F6BpqqhCHZ6bybUBgF3OmIXCXG4gNkgIwAOALNctK6JXYr1edwTYFUGDbFlAZLmB7K15/LZUcgSwhdgOYQgxIAuL5RaIW4BthA7pH3hu29I0sLDYrEj21rzjJdgejt/AUqm0QDTNeAIGAn4sS1UomuYKALh4+THvEUVR0eH3Y0tpQHUBcIWgQRhCEGL84npjyzHANcKA9B8kDMPwRIPIagy1Ef0vcYRPf3qUT9s+i9DiH9O0CzMbDwxUAAAAAElFTkSuQmCC' ))

        const
            defMenu = Menu.buildFromTemplate([
                {
                    label: 'Exit',
                    type:  'normal',
                    click: () => {
                        electron.app.quit()
                        process.exit()
                    }
                }
            ])

        this.ref.setToolTip( 'Sidelaunch' )
        this.ref.setContextMenu( defMenu )
    }
}

export default new TrayIcon()
