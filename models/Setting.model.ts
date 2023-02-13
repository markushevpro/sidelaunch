import { Prisma } from '../db/client'

const FullSettingData = Prisma.validator<Prisma.SettingArgs>()({})

type TSetting = Prisma.SettingGetPayload<typeof FullSettingData>

export type TCreateSetting = Prisma.SettingCreateInput

export default TSetting
