import electron, { Tray, Menu, nativeImage } from 'electron'

class TrayIcon {

    ref?: Electron.Tray

    init = () => {
        this.ref = new Tray( nativeImage.createFromDataURL( 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAM7SURBVHgB7Vc9UBNREN53+SFggpmJBTCKxwxCI46MluCQEisbbAVHh3RgKQ2k0dJghT8j9DZ2jFUypLDxh9EKdYYbdIACFA3yc0nuufvInXeBS+4uYbTwm8nk3r73dr/db+/uHQOPSKRbZO4PzAIDheXzyZn4ugIewMAlxtPR6I6/eQw3TpntnPGUlM9PuyXiisBotn2MY2DcFLXxpmgaTz658mUOHMIRgVvZ0wM+YJO4fMDJeiJS5NrI0/6vmepLK4B01vyBBwzYNfACxueq9ceRBHSd6dK23C5AsjUVfk6n4ltbVQncXjgzLElYbg4y1BM2/WEQcK1zDURYXo3rski63cel2WMPTsDK8kAwrQ8l+Mv4Nwnk1gqwNP8L9rc1i13FMdlX3+0d2mNnV7I7R/qqSGB1cR8y9zbh7bMfFnswLMGrh9/gzazVToFpfW69AOWJvJzYEHNqzgUBHe+f52A5u2uxnR9qxoD7wrmOj5ghoa03ZFlbTtQ1gdbehoPMSsGITBvazEEJRIjskRY/bH5SLfZYZwA8E+jBbBvCDDL3N8WY9KQsidjq4l4pyJ4ofdfgCaH1UokY/ZNd7m8CzwQaUPOBiZjI5APKsVYqfdvFkCGDUpKIiKm5otFwS/PbglSk1Q+eCeiOe4Yi8BobUt0uitJfuB4pVWRX/OT+RlH+7qthfNBxbNTvgmz3YLiae2fPgcs3T2ImPsyMi9LT3UAyUJMdlLlRrCN7FwalKkRafEa/1EyAHMfvxiy2jr5GUWqaM2eqk7mEpJ3AeBmNLrQv40ima8qK9I2dC4o+0LHxWcVXPAg7PZQ2sONpnsZm0N5gRBJzui/LLYovpEd9Kx10eWSHkJ70K8epzj+BKPPy+97Yb2o8O186/r+MDAKsKMXxDlLg2MEzDA+sRtzy6QQeyTidjFidj2SYHD4jkjN2RzIzhtNyNOTXxrHhJ6HWuBy2JAbToYKUSsWV6odSMxJpWdZ82hRjcAO8BAf2QiqwOzNxRbFb4+jDJIEHVk5nRseyoM5U7lo/TA4RqdIfVG5s6+TjvpUUOITrj1OShWN/4OVYmaOknc51JWAmctAf/Cwr+EYq6VwJvwELG4EdwLgplAAAAABJRU5ErkJggg==' ))

        const
            defMenu = Menu.buildFromTemplate([
                {
                    label: 'Exit',
                    type:  'normal',
                    click: () => electron.app.quit()
                }
            ])

        this.ref.setToolTip( 'MPRO FastAccess' )
        this.ref.setContextMenu( defMenu )
    }
}

export default new TrayIcon()
