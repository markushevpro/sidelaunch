import { PrismaClient } from '../db/client'

export class Database {
    protected prisma: any

    constructor () {
        this.prisma = new PrismaClient()
    }

    close () {
        this.prisma.$disconnect()
    }
}

export default Database
