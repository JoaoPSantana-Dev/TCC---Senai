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

    @Get(":id")
    listarUmaPagina(@Param("id") id:number){
        return this.paginaService.listarUmaPagina(id);
    }
    @Delete(":id")
    apagarPagina(@Param("id") id:number){
        return this.paginaService.apagarPagina(+id);
    }
    @Patch(":id")
    updatePagina(@Param("id") id:number, @Body() updatePaginaDto:CreatePaginaDto){
        return this.paginaService.updatePagina(id,updatePaginaDto);
    }
}