import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  AdministradorGuard,
  JwtAuthGuard,
} from '../../modulos/login/jwt-auth.guard';
import { NoticiasService } from './noticias.service';
import {
  opcoesUploadImagem,
  removerArquivoNoticia,
} from './upload-imagem.util';

const tituloMaximo = 191;

// o corpo é multipart campo "titulo" + arquivo "imagem", então validamos à mão
// assim dá para apagar o arquivo que o multer já gravou se o título estiver inválido
function tituloValido(corpo: { titulo?: string }, obrigatorio: boolean) {
  const titulo = (corpo.titulo ?? '').trim();
  if (!titulo) {
    if (obrigatorio) throw new BadRequestException('Informe o título');
    return undefined;
  }
  if (titulo.length > tituloMaximo) {
    throw new BadRequestException(
      `Título com no máximo ${tituloMaximo} letras`,
    );
  }
  return titulo;
}

@Controller('noticias')
export class NoticiasController {
  constructor(private readonly noticiasService: NoticiasService) {}

  // leitura é pública, o totem busca por aqui
  // escrever exige administrador

  @Get()
  listar() {
    return this.noticiasService.listar();
  }

  @Post()
  @UseGuards(JwtAuthGuard, AdministradorGuard)
  @UseInterceptors(FileInterceptor('imagem', opcoesUploadImagem))
  async criar(
    @Body() corpo: { titulo?: string },
    @UploadedFile() arquivo?: Express.Multer.File,
  ) {
    try {
      const titulo = tituloValido(corpo, true)!;
      if (!arquivo) throw new BadRequestException('Envie a imagem da notícia');
      return await this.noticiasService.criar(titulo, arquivo.filename);
    } catch (erro) {
      await removerArquivoNoticia(arquivo?.filename);
      throw erro;
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdministradorGuard)
  @UseInterceptors(FileInterceptor('imagem', opcoesUploadImagem))
  async atualizar(
    @Param('id', ParseIntPipe) id: number,
    @Body() corpo: { titulo?: string },
    @UploadedFile() arquivo?: Express.Multer.File,
  ) {
    try {
      return await this.noticiasService.atualizar(id, {
        titulo: tituloValido(corpo, false),
        imagem: arquivo?.filename,
      });
    } catch (erro) {
      await removerArquivoNoticia(arquivo?.filename);
      throw erro;
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdministradorGuard)
  apagar(@Param('id', ParseIntPipe) id: number) {
    return this.noticiasService.apagar(id);
  }
}
