import { useMemo } from 'react'

import { getValueFromInput } from 'src/@/shared/utils/inputs'

import type { SliderMarker } from './types'

import { isSliderMarker } from './helpers'
import styles             from './slider-input.module.css'

interface PSliderInput
{
    value: string | number
    markers?: ( string | SliderMarker )[]
    min?: number
    max?: number
    onChange: ( val: string ) => void
}

export
function SliderInput
({ value, markers, min, max, onChange }: PSliderInput )
{
    const id = useMemo(() => crypto.randomUUID(), [])

    const _markers = useMemo(
        () => markers?.map( m => isSliderMarker( m )
            ? m
            : {
                value:   m,
                label:   m,
                visible: true
            }),
        [ markers ]
    )

    return (
        <div className={styles.container}>
            <input
                className={styles.input}
                list={id}
                max={max}
                min={min}
                type="range"
                value={value}
                onChange={getValueFromInput( onChange )}
            />

            {
                _markers && (
                    <datalist className={styles.markers} id={id}>
                        {
                            _markers.map( m => (
                                <option key={m.label} label={m.visible ? m.label : undefined} value={m.value} />
                            ))
                        }
                    </datalist>
                )
            }
        </div>
    )
}
