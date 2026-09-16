import { PartialType } from "@nestjs/mapped-types";
import { CreateVagaEstagioDto } from "./create.vaga-estagio.dto";

export class UpdateVagaEstagioDto extends PartialType(CreateVagaEstagioDto){}