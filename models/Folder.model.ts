import { Prisma } from '../db/client'

import Include from './includes'

const FullFolderData = Prisma.validator<Prisma.FolderArgs>()( Include.Folder )

type TFolder = Prisma.FolderGetPayload<typeof FullFolderData>

export type TCreateFolder = Prisma.FolderUncheckedCreateInput

export default TFolder
