import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateVagaCursoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(191)
  nomeCurso!: string;

  @IsOptional()
  @IsString()
  @MaxLength(191)
  areaCurso?: string;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  descricao?: string;

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  requisitos?: string;

  @IsOptional()
  @IsString()
  @MaxLength(191)
  cargaHoraria?: string;

  @IsOptional()
  @IsString()
  @MaxLength(191)
  turno?: string;

  @IsOptional()
  @IsString()
  @MaxLength(191)
  contato?: string;
}
