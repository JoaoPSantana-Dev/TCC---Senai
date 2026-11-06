import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { SenhaForte } from '../../modulos/login/senha-forte.decorator';

const limpar = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;

// a própria pessoa editando os seus dados em PATCH /usuarios/eu
// a função administrador/visitante não pode ser mudada por aqui
export class AtualizarPerfilDto {
  @IsOptional()
  @Transform(limpar)
  @IsString()
  @IsNotEmpty({ message: 'Não pode ficar vazio' })
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

  // exigida só para trocar o email
  @IsOptional()
  @IsString()
  @MaxLength(72)
  senhaAtual?: string;
}

// POST /usuarios/eu/senha
export class AlterarSenhaDto {
  @IsString()
  @IsNotEmpty({ message: 'Informe a senha atual' })
  @MaxLength(72)
  senhaAtual!: string;

  @SenhaForte()
  novaSenha!: string;
}
