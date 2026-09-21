import { IsNotEmpty, IsString, IsOptional, IsObject } from 'class-validator';

export class CreatePaginaDto {
  @IsString()
  @IsNotEmpty()
  nomePagina!: string;

  @IsString()
  @IsNotEmpty()
  tipoPagina!: string;

  @IsOptional()
  @IsObject()
  componentes?: Record<string, unknown>;

  @IsString()
  @IsNotEmpty()
  href!: string;
}
