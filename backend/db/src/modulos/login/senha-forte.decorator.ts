import { applyDecorators } from '@nestjs/common';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

// regra de senha usada no cadastro e na redefinição
// o limite de 72 existe porque o próprio bcrypt ignora o que passar de 72 bytes
export function SenhaForte() {
  return applyDecorators(
    IsString(),
    MinLength(8, { message: 'A senha precisa ter no mínimo 8 caracteres' }),
    MaxLength(72, { message: 'A senha pode ter no máximo 72 caracteres' }),
    Matches(/[A-Za-z]/, {
      message: 'A senha precisa ter pelo menos uma letra',
    }),
    Matches(/\d/, { message: 'A senha precisa ter pelo menos um número' }),
  );
}
