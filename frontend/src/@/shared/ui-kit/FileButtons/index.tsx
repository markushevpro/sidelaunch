import { Button }       from 'src/@/shared/ui-kit/Button'
import { ExternalIcon } from 'src/@/shared/ui-kit/icons/External'

import { useFileButtons } from './hook'

interface PFileButtons
{
    value?: string
    dir?: boolean
    onSearch?: ( onFound: ( val: string ) => void ) => () => Promise<void>
    onChange: ( val: string ) => void
}

export
function FileButtons
({ value, dir, onChange, onSearch }: PFileButtons )
{
    const { searcher, external } = useFileButtons( value, dir, onChange, onSearch )

    return (
        <>
            <Button onClick={searcher}>...</Button>

            <Button disabled={!value} onClick={external}>
                <ExternalIcon />
            </Button>
        </>
    )
}
