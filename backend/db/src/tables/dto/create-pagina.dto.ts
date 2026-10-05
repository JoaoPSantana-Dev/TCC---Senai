import { Prisma } from '../../../generated/prisma/client';
import { IsNotEmpty, IsString, IsArray, IsObject } from 'class-validator';

export class CreatePaginaDto {
  @IsString()
  @IsNotEmpty()
  slug!: string;

  @IsString()
  @IsNotEmpty()
  nomePagina!: string;

  @IsString()
  @IsNotEmpty()
  tipoPagina!: string;

  @IsArray()
  @IsObject({ each: true })
  @IsNotEmpty()
  conteudo!: Prisma.InputJsonValue;
}
