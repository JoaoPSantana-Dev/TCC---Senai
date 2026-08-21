import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit{
    constructor() {
        const adapter = new PrismaMariaDb(process.env.DATABASE_URL!, {
            useTextProtocol:true,
        });
        super({ adapter })
    }
    async onModuleInit() {
        await this.$connect();
    }
}