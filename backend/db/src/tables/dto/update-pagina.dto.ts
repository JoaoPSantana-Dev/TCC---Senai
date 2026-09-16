import { PartialType } from "@nestjs/mapped-types";
import { CreatePaginaDto } from "./create-pagina.dto";

export class UpdatePaginaDto extends PartialType(CreatePaginaDto){}