<<<<<<< HEAD
import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Global()
@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})
=======
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})

>>>>>>> 7a6c7928f51c1cd4cbafcc6507eb3107e0d84ead
export class PrismaModule {}