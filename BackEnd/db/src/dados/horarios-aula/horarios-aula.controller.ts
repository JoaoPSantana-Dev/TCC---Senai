import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { HorariosAulaService } from "./horarios-aula.service";
import { CreateHorarioAulaDto } from "../dto/create-horario-aula.dto";

@Controller('horarios-aula')
export class HorariosAulaController{
    constructor(private readonly horariosAulaService:HorariosAulaService ){}

    @Post()
    criarHorarioAula(@Body() createHorarioAulaDto:CreateHorarioAulaDto){
        return this.horariosAulaService.criarHorarioAula(createHorarioAulaDto);
    }

    @Get()
    listarTodosHorarios(){
        return this.horariosAulaService.listarTodosHorarios();
    }
    @Delete(":id")
    apagarAula(@Param("id") id:number){
        return this.horariosAulaService.apagarAula(+id);
    }
    @Patch(":id")
    updateAula(@Param("id") id:number, @Body() updateAulaDto:CreateHorarioAulaDto){
        return this.horariosAulaService.updateAula(id,updateAulaDto);
    }
}