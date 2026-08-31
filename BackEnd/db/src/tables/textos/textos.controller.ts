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
    @Get(":id")
    listarUmTexto(@Param("id") id:number){
        return this.textosService.listarUmTexto(id);
    }
    @Delete(":id")
    apagarTexto(@Param("id") id:number){
        return this.textosService.apagarTexto(+id);
    }
    @Patch(":id")
    updateAula(@Param("id") id:number, @Body() updateTextoDto:CreateTextoDto){
        return this.textosService.updateTexto(id,updateTextoDto);
    }
}