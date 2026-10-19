import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreatePaginaDto } from './create-pagina.dto';

export class UpdatePaginaDto extends PartialType(
  OmitType(CreatePaginaDto, ['slug'] as const),
) {}
