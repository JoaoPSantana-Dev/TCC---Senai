import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { VagasEmpregoService } from "./vagas-emprego.service";
import { CreateVagaEmpregoDto } from "../dto/create-vaga-emprego.dto";

@Controller('vagas-emprego')
    export class VagasEmpregoController {
        constructor(private readonly vagasEmpregoService: VagasEmpregoService){}

        @Post()
        criarVagaEmprego(@Body() createVagaEmpregoDto:CreateVagaEmpregoDto){
            return this.vagasEmpregoService.criarVagaEmprego(createVagaEmpregoDto);
        }

        @Post('lote')
        criarVagasEmprego(@Body() createVagaEmpregoDto:CreateVagaEmpregoDto[]){
            return this.vagasEmpregoService.criarVagasEmprego(createVagaEmpregoDto);
        }

        @Get()
        listarTodasVagasEmprego(){
            return this.vagasEmpregoService.listarTodasVagasEmprego();
        }

        @Get(":id")
        listarUmaVagaEmprego(@Param("id") id:number){
            return this.vagasEmpregoService.listarUmaVagaEmprego(+id);
        }

        @Delete(":id")
        apagarVagaEmprego(@Param("id") id:number){
            return this.vagasEmpregoService.apagarVagaEmprego(+id);
        }

        @Patch(":id")
        updateVagaEmprego(@Param("id") id:number, @Body() updateVagaEmpregoDTO:CreateVagaEmpregoDto){
            return this.vagasEmpregoService.updateVagaEmprego(+id,updateVagaEmpregoDTO);
        }
    }
