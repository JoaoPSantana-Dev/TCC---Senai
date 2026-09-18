import { Module } from "@nestjs/common";
import { VagasEstagioController } from "./vagas-estagio.controller";
import { VagasEstagioService } from "./vagas-estagio.service";

@Module({
    controllers: [VagasEstagioController],
    providers: [VagasEstagioService]
})
export class VagasEstagioModule{}