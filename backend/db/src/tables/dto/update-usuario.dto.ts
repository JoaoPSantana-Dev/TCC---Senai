import { Transform } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export const funcoesUsuario = ['Administrador', 'Visitante'] as const;

// só administradores chegam aqui, email e senha não mudam por esse caminho
export class UpdateUsuarioDto {
  @IsOptional()
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nome?: string;

  @IsOptional()
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  unidade?: string;

  @IsOptional()
  @IsIn(funcoesUsuario, {
    message: 'Função deve ser Administrador ou Visitante',
  })
  funcao?: (typeof funcoesUsuario)[number];
}
