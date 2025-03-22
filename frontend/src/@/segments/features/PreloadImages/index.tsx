import type { PropsWithChildren } from 'react'

import { usePreloadImages } from './hook'

type PPreloadImages = PropsWithChildren

export
function PreloadImages
({ children }: PPreloadImages )
{
    usePreloadImages()

    return (
        <>{ children }</>
    )
}
