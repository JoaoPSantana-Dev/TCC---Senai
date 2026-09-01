import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateTextoDto {
  @IsString()
  @IsNotEmpty()
  texto!: string;

  @IsString()
  @IsNotEmpty()
  tipoTexto!: string;

  @IsInt()
  @IsPositive()
  idPagina!: number;
}
