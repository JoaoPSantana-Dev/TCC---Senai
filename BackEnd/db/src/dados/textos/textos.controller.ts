import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { TextosService } from "./textos.service";
import { CreateTextoDto } from "../dto/create-texto.dto";

@Controller('textos')
export class TextosController{
    constructor(private readonly textosService: TextosService){}

    @Post()
    criarTexto(@Body() createTextoDto:CreateTextoDto){
        return this.textosService.criarTexto(createTextoDto);
    }

    @Get()
    listarTodosTextos(){
        return this.textosService.listarTodosTextos();
    }
}