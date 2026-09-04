import { Module } from "@nestjs/common";
import { PaginasController } from "./paginas.controller";
import { PaginasService } from "./paginas.service";

@Module({
    controllers: [PaginasController],
    providers: [PaginasService]
})
export class PaginasModule{}