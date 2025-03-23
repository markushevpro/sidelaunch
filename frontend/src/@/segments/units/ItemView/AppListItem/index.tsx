import { ErrorBadge }    from 'src/@/segments/units/ErrorBadge'
import { IconWithBadge } from 'src/@/segments/units/IconWithBadge'

import type { AppItem } from 'src/@/shared/types/items'

import { useAppListItem } from './hook'

interface PAppListItem
{
    data: AppItem
}

export
function AppListItem
({ data }: PAppListItem )
{
    const { loading, error, icon, click } = useAppListItem( data )

    return (
        <IconWithBadge
            badge={error && <ErrorBadge />}
            fallback={icon.fallback}
            icon={icon.icon}
            loading={loading}
            title={`${data.name}${error ? ` (${error})` : ''}`}
            onClick={click}
            onError={icon.fix}
        />
    )
}
