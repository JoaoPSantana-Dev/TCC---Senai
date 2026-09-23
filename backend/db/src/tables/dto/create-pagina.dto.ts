import { Prisma } from '../../../generated/prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePaginaDto {
  @IsString()
  @IsNotEmpty()
  nomePagina!: string;

  @IsString()
  @IsNotEmpty()
  tipoPagina!: string;

  @IsOptional()
  componentes?: Prisma.InputJsonValue;

  @IsString()
  @IsNotEmpty()
  href!: string;
}
