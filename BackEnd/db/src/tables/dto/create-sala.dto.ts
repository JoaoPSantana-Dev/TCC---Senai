import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSalaDto {
  @IsString()
  @IsNotEmpty()
  nomeSala!: string;

  @IsString()
  @IsNotEmpty()
  andar!: string;

  @IsString()
  @IsNotEmpty()
  bloco!: string;

  @IsString()
  @IsNotEmpty()
  imagem!: string;
}
