import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateVagaEmpregoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(191)
  nomeEmpresa!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(191)
  cargo!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  requisitos!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(191)
  salario!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  beneficios!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  descricao!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(191)
  localizacao!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(191)
  contato!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(191)
  areaEmprego!: string;
}
