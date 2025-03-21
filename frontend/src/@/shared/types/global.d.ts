export
interface ScreenDetailed
{
    isPrimary: boolean
    left: number
    width: number
    top: number
    height: number
    devicePixelRatio: number
}

declare global {
    interface Window {
        getScreenDetails: () => Promise<{ currentScreen: ScreenDetailed, screens: ScreenDetailed[] }>
    }
}
