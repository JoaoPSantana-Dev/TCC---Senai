import { PartialType } from "@nestjs/mapped-types";
import { CreateVagaEmpregoDto } from "./create-vaga-emprego.dto";

export class UpdateVagaEmpregoDto extends PartialType(CreateVagaEmpregoDto){}