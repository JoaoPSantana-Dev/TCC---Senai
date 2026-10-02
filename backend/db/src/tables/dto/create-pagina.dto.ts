import { Prisma } from '../../../generated/prisma/client';
import { IsNotEmpty, IsString, IsJSON } from 'class-validator';

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

  @IsJSON()
  @IsNotEmpty()
  conteudo: Prisma.InputJsonValue;
}
