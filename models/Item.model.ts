import { Prisma } from '../db/client'

import Include from './includes'

const FullItemData = Prisma.validator<Prisma.ItemArgs>()( Include.Item )

type TItem = Prisma.ItemGetPayload<typeof FullItemData>

export type TCreateItem = Prisma.ItemUncheckedCreateInput

export default TItem
