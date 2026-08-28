<<<<<<< HEAD
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
=======
import 'dotenv/config'
import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from "generated/prisma/client";


@Injectable()
export class PrismaService extends PrismaClient{
    constructor(){
        const adapter = new PrismaMariaDb(process.env.DATABASE_URL!, {
            useTextProtocol: true
        });

        super({adapter});
    }

    async onModuleInit(){
>>>>>>> 7a6c7928f51c1cd4cbafcc6507eb3107e0d84ead
        await this.$connect();
    }
}