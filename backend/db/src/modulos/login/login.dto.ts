/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { SenhaForte } from './senha-forte.decorator';

const normalizarEmail = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim().toLowerCase() : value;

export class LoginDto {
  @Transform(normalizarEmail)
  @IsEmail({}, { message: 'Endereço de email inválido' })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe a senha' })
  @MaxLength(72)
  senha!: string;
}

export class Login2faDto {
  @IsString()
  @IsNotEmpty()
  tokenTemporario!: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe o código' })
  @MaxLength(20)
  codigo!: string;
}

export class CodigoDto {
  @IsString()
  @IsNotEmpty({ message: 'Informe o código' })
  @MaxLength(20)
  codigo!: string;
}

export class DesativarDoisFatoresDto {
  @IsString()
  @IsNotEmpty({ message: 'Informe a senha' })
  @MaxLength(72)
  senha!: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe o código' })
  @MaxLength(20)
  codigo!: string;
}

export class SolicitarRecuperacaoDto {
  @Transform(normalizarEmail)
  @IsEmail({}, { message: 'Endereço de email inválido' })
  email!: string;
}

export class RedefinirSenhaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  token!: string;

  @SenhaForte()
  senha!: string;
}

export { normalizarEmail };
