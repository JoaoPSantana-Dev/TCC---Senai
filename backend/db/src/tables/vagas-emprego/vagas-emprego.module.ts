import { Module } from "@nestjs/common";
import { VagasEmpregoController } from "./vagas-emprego.controller";
import { VagasEmpregoService } from "./vagas-emprego.service";

@Module({
    controllers: [VagasEmpregoController],
    providers: [VagasEmpregoService]
})
export class VagasEmpregoModule{}