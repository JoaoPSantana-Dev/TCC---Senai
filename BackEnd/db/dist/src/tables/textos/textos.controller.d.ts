import { TextosService } from "./textos.service";
import { CreateTextoDto } from "../dto/create-texto.dto";
export declare class TextosController {
    private readonly textosService;
    constructor(textosService: TextosService);
    criarTexto(createTextoDto: CreateTextoDto): import("../../../generated/prisma/models").Prisma__TextoClient<{
        idTextos: number;
        texto: string;
        tipoTexto: string;
        idPagina: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    listarTodosTextos(): import("../../../generated/prisma/internal/prismaNamespace").PrismaPromise<({
        pagina: {
            idPaginas: number;
            nomePagina: string;
            tipoPagina: string;
        };
    } & {
        idTextos: number;
        texto: string;
        tipoTexto: string;
        idPagina: number;
    })[]>;
    listarUmTexto(id: number): import("../../../generated/prisma/models").Prisma__TextoClient<({
        pagina: {
            idPaginas: number;
            nomePagina: string;
            tipoPagina: string;
        };
    } & {
        idTextos: number;
        texto: string;
        tipoTexto: string;
        idPagina: number;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    apagarTexto(id: number): import("../../../generated/prisma/models").Prisma__TextoClient<{
        idTextos: number;
        texto: string;
        tipoTexto: string;
        idPagina: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    updateAula(id: number, updateTextoDto: CreateTextoDto): import("../../../generated/prisma/models").Prisma__TextoClient<{
        idTextos: number;
        texto: string;
        tipoTexto: string;
        idPagina: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
}
