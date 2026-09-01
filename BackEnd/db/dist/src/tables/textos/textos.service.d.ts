import { CreateTextoDto } from "../dto/create-texto.dto";
import { PrismaService } from "../../prisma/prisma.service";
export declare class TextosService {
    private prisma;
    constructor(prisma: PrismaService);
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
    updateTexto(id: number, updateTextoDto: CreateTextoDto): import("../../../generated/prisma/models").Prisma__TextoClient<{
        idTextos: number;
        texto: string;
        tipoTexto: string;
        idPagina: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
}
