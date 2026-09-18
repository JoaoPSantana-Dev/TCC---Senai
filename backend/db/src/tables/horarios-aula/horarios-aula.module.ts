import { Module } from "@nestjs/common";
import { HorariosAulaController } from "./horarios-aula.controller";
import { HorariosAulaService } from "./horarios-aula.service";

@Module({
    controllers: [HorariosAulaController],
    providers: [HorariosAulaService]
})


export class HorariosAulaModule{}