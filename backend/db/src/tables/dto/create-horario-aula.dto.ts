import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateHorarioAulaDto {
  @IsString()
  @IsNotEmpty()
  nomeCurso!: string;

  @IsString()
  @IsNotEmpty()
  professor!:  string;

  @IsString()
  @IsNotEmpty()
  materia!:  string;

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
