import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVagaEstagioDto {
  @IsString()
  @IsNotEmpty()
  nomeEmpresa!: string;

  @IsString()
  @IsNotEmpty()
  cargo!: string;

  @IsString()
  @IsNotEmpty()
  requisitos!: string;

  @IsString()
  @IsNotEmpty()
  salario!: string;

  @IsString()
  @IsNotEmpty()
  beneficios!: string;

  @IsString()
  @IsNotEmpty()
  descricao!: string;

  @IsString()
  @IsNotEmpty()
  localizacao!: string;

  @IsString()
  @IsNotEmpty()
  contato!: string;

  @IsString()
  @IsNotEmpty()
  areaEstagio!: string;
}
