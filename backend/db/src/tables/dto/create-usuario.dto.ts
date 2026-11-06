import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { SenhaForte } from '../../modulos/login/senha-forte.decorator';

const limpar = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;

// para o cadastro público, a função não vem do formulário, o servidor decide
export class CreateUsuarioDto {
  @Transform(limpar)
  @IsString()
  @IsNotEmpty({ message: 'Nome é obrigatório ' })
  @MaxLength(100)
  nome!: string;

  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsEmail({}, { message: 'Endereço de email inválido' })
  email!: string;

  @SenhaForte()
  senha!: string;

  @Transform(limpar)
  @IsString()
  @IsNotEmpty({ message: 'Unidade é obrigatória' })
  @MaxLength(100)
  unidade!: string;
}
