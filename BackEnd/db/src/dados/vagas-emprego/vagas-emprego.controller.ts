import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { VagasEmpregoService } from "./vagas-emprego.service";
import { CreateVagaEmpregoDto } from "../dto/create-vaga-emprego.dto";

@Controller('vagas-emprego')
    export class VagasEmpregoController {
        constructor(private readonly vagasEmpregoService: VagasEmpregoService){}

        @Post()
        criarVagasEmprego(@Body() createVagaEmpregoDto:CreateVagaEmpregoDto){
            return this.vagasEmpregoService.criarVagaEmprego(createVagaEmpregoDto);
        }

        @Get()
        listarTodasVagasEmprego(){
            return this.vagasEmpregoService.listarTodasVagasEmprego();
        }

    }
