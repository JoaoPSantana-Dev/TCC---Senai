import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { SalasService } from "./salas.service";
import { CreateSalaDto } from "../dto/create-sala.dto";

@Controller('salas')
export class SalasController{
    constructor(private readonly salasService:SalasService){}

    @Post()
    criarSala(@Body() createSalaDto:CreateSalaDto){
        return this.salasService.criarSala(createSalaDto);
    }

    @Post('lote')
    criarSalas(@Body() createSalaDto:CreateSalaDto[]){
        return this.salasService.criarSalas(createSalaDto);
    }

    @Get()
    listarTodasSalas(){
        return this.salasService.listarTodasSalas();
    }

    @Get(":id")
    listarUmaSala(@Param("id") id:number){
        return this.salasService.listarUmaSala(id);
    }
    @Delete(":id")
    apagarSala(@Param("id") id:number){
        return this.salasService.apagarSala(+id);
    }
    @Patch(":id")
    updateSala(@Param("id") id:number, @Body() updateSalaDto:CreateSalaDto){
        return this.salasService.updateSala(id,updateSalaDto);
    }
}