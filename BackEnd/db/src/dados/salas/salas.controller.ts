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

    @Get()
    listarTodasSalas(){
        return this.salasService.listarTodasSalas;
    }
}