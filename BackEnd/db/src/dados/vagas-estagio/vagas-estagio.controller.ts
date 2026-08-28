import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { VagasEstagioService } from "./vagas-estagio.service";
import { CreateVagaEstagioDto } from "../dto/create.vaga-estagio.dto";

@Controller('vagas-estagio')
export class VagasEstagioController {
    constructor(private readonly vagasEstagioService: VagasEstagioService){}

    @Post()
    criarVagaEmprego(@Body() createVagaEstagioDto: CreateVagaEstagioDto){
        return this.vagasEstagioService.criarVagaEstagio(createVagaEstagioDto);
    }

    @Get()
    listarTodasVagasEstagio() {
        return this.vagasEstagioService.listarTodasVagasEstagio();
    }

}