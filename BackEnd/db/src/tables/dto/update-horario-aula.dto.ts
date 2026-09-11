import { PartialType } from "@nestjs/mapped-types";
import { CreateHorarioAulaDto } from "./create-horario-aula.dto";

export class UpdateHorarioAulaDto extends PartialType(CreateHorarioAulaDto){}