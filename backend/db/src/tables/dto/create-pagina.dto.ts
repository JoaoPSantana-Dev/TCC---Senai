import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePaginaDto {
  @IsString()
  @IsNotEmpty()
  nomePagina!: string;

  @IsString()
  @IsNotEmpty()
  tipoPagina!: string;
}