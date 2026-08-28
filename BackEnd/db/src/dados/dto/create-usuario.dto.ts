import {IsEmail, IsNotEmpty, IsString} from 'class-validator'

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nome!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  senha!: string;

  @IsString()
  @IsNotEmpty()
  funcao!: string;

  @IsString()
  @IsNotEmpty()
  unidade!: string;
}
