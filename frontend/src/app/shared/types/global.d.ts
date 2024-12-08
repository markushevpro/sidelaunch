import type * as runtime from '@/app/shared/wailsjs/runtime/runtime'

declare global {
    interface Window {
        runtime: typeof runtime
    }
    interface Screen {
        availLeft: number
    }
}
