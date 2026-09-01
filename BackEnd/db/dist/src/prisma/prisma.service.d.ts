import 'dotenv/config';
import { PrismaClient } from "../../generated/prisma/client";
export declare class PrismaService extends PrismaClient {
    constructor();
    onModuleInit(): Promise<void>;
}
