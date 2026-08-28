import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { PaginasService } from "./paginas.service";
import { CreatePaginaDto } from "../dto/create-pagina.dto";

@Controller('paginas')
export class PaginasController {
    constructor(private readonly paginaService: PaginasService){}
    

    @Post()
    criarPagina(@Body() createPaginaDto: CreatePaginaDto){
        return this.paginaService.criarPagina(createPaginaDto);
    }

    @Get()
    listarTodasPaginas(){
        return this.paginaService.listarTodasPaginas();
    }
}