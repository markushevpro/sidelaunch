import { TConfig, TFolder, TLibrary } from 'models'

import utils from './utils'

export const load = async () => {
    const
        config: TConfig = await window.backend.config.load(),
        rawLib: TLibrary = await window.backend.library.load(),
        library: TFolder = await utils.iconize( utils.parentize( utils.topFolder( rawLib ))) as TFolder

    return {
        config,
        library
    }
}
