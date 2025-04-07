import type { SliderMarker } from './types'

export
function isSliderMarker
( value: string | SliderMarker ): value is SliderMarker
{
    return typeof value !== 'string'
}
