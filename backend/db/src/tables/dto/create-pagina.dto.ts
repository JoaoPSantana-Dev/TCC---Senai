import { Transform, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsIn,
  IsNotEmpty,
  IsObject,
  IsString,
  Matches,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import {
  limiteComponentes,
  limiteNomePagina,
  limiteSlug,
  regexSlug,
  tiposComponentes,
  tiposPagina,
} from '../paginas/paginas.constantes';

const removerEspacos = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;

export class ComponentePaginaDto {
  @IsString({ message: 'O tipo do componente deve ser um texto' })
  @IsIn(tiposComponentes, {
    message: `O tipo do componentes deve ser um desses: ${tiposComponentes.join(', ')}`,
  })
  type!: string;

  @IsObject({ message: 'As props do componente devem ser um objeto' })
  props!: Record<string, unknown>;
}

export class CreatePaginaDto {
  @Transform(removerEspacos)
  @IsString({ message: 'O slug deve ser um texto' })
  @IsNotEmpty({ message: 'O slug é obrigatório' })
  @MaxLength(limiteSlug, {
    message: `O slug deve ter no máximo ${limiteSlug} caracteres`,
  })
  @Matches(regexSlug, {
    message:
      'O slug deve ter apenas letras minúsculas, números e hífens. Exemplo: "vagas-de-emprego"',
  })
  slug!: string;

  @Transform(removerEspacos)
  @IsString({ message: 'O nome da página deve ser um texto' })
  @IsNotEmpty({ message: 'O nome da página é obrigatório' })
  @MaxLength(limiteNomePagina, {
    message: `O nome da página deve ter no máximo ${limiteNomePagina} caracteres`,
  })
  nomePagina!: string;

  @IsIn(tiposPagina, {
    message: `O tipo da página deve ser um destes: ${tiposPagina.join(', ')}`,
  })
  tipoPagina!: (typeof tiposPagina)[number];

  @IsArray({ message: 'O conteúdo deve ser uma lista de componentes' })
  @ArrayMaxSize(limiteComponentes, {
    message: `A página pode ter no máximo ${limiteComponentes} componentes`,
  })
  @ValidateNested({ each: true })
  @Type(() => ComponentePaginaDto)
  conteudo!: ComponentePaginaDto[];
}
