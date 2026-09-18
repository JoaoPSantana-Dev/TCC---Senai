import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateHorarioAulaDto {
  @IsString()
  @IsNotEmpty()
  nomeCurso!: string;

  @IsString()
  @IsNotEmpty()
  turno!: string;

  @IsString()
  @IsNotEmpty()
  dia!: string;

  @IsInt()
  @IsPositive()
  idSala!: number;


}
