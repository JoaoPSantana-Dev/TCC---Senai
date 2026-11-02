import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export const funcoesUsuario = ['Administrador', 'Visitante'] as const;

const limpar = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;

// só administradores chegam aqui, a senha não muda por esse caminho
export class UpdateUsuarioDto {
  @IsOptional()
  @Transform(limpar)
  @IsString()
  @IsNotEmpty({ message: 'Nome não pode ficar vazio' })
  @MaxLength(100)
  nome?: string;

  @IsOptional()
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsEmail({}, { message: 'Endereço de email inválido' })
  email?: string;

  @IsOptional()
  @Transform(limpar)
  @IsString()
  @IsNotEmpty({ message: 'Unidade não pode ficar vazia' })
  @MaxLength(100)
  unidade?: string;

  @IsOptional()
  @IsIn(funcoesUsuario, {
    message: 'Função deve ser Administrador ou Visitante',
  })
  funcao?: (typeof funcoesUsuario)[number];
}
