import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { VagasEstagioService } from "./vagas-estagio.service";
import { CreateVagaEstagioDto } from "../dto/create.vaga-estagio.dto";

@Controller('vagas-estagio')
export class VagasEstagioController {
    constructor(private readonly vagasEstagioService: VagasEstagioService){}

    @Post()
    criarVagaEstagio(@Body() createVagaEstagioDto: CreateVagaEstagioDto){
        return this.vagasEstagioService.criarVagaEstagio(createVagaEstagioDto);
    }

    @Post('lote')
    criarVagasEstagio(@Body() createVagaEstagioDto:CreateVagaEstagioDto[]){
        return this.vagasEstagioService.criarVagasEstagios(createVagaEstagioDto);
    }

    @Get()
    listarTodasVagasEstagio() {
        return this.vagasEstagioService.listarTodasVagasEstagio();
    }

    @Get(":id")
    listarUmaVagaEstagio(@Param("id") id:number){
        return this.vagasEstagioService.listarUmaVagaEstagio(+id);
    }

    @Delete(":id")
    apagarVagaEstagio(@Param("id") id:number){
        return this.vagasEstagioService.apagarVagaEstagio(+id);
    }

    @Patch(":id")
    updateVagaEstagio(@Param("id") id:number, @Body() updateVagaEstagioDTO: CreateVagaEstagioDto){
        return this.vagasEstagioService.updateVagaEstagio(+id, updateVagaEstagioDTO);
    }

}