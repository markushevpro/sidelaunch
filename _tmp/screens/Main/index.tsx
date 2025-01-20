import { List }      from 'src/@/segments/composition/List'
import { Providers } from 'src/@/segments/features/Providers'

export
function MainScreen
()
{
    return (
        <Providers>
            <List />
        </Providers>
    )
}
