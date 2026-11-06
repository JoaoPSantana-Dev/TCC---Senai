import { PartialType } from '@nestjs/mapped-types';
import { CreateTextoDto } from './create-texto.dto';

export class UpdateTextoDto extends PartialType(CreateTextoDto) {}
