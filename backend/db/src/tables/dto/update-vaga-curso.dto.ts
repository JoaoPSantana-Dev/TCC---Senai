import { PartialType } from '@nestjs/mapped-types';
import { CreateVagaCursoDto } from './create-vaga-curso.dto';

export class UpdateVagaCursoDto extends PartialType(CreateVagaCursoDto) {}
