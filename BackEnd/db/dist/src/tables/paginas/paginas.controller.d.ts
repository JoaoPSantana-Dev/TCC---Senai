import { PaginasService } from "./paginas.service";
import { CreatePaginaDto } from "../dto/create-pagina.dto";
export declare class PaginasController {
    private readonly paginaService;
    constructor(paginaService: PaginasService);
    criarPagina(createPaginaDto: CreatePaginaDto): import("../../../generated/prisma/models").Prisma__PaginaClient<{
        idPaginas: number;
        nomePagina: string;
        tipoPagina: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    listarTodasPaginas(): import("../../../generated/prisma/internal/prismaNamespace").PrismaPromise<({
        textos: {
            idTextos: number;
            texto: string;
            tipoTexto: string;
            idPagina: number;
        }[];
    } & {
        idPaginas: number;
        nomePagina: string;
        tipoPagina: string;
    })[]>;
    listarUmaPagina(id: number): import("../../../generated/prisma/models").Prisma__PaginaClient<({
        textos: {
            idTextos: number;
            texto: string;
            tipoTexto: string;
            idPagina: number;
        }[];
    } & {
        idPaginas: number;
        nomePagina: string;
        tipoPagina: string;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    apagarPagina(id: number): import("../../../generated/prisma/models").Prisma__PaginaClient<{
        idPaginas: number;
        nomePagina: string;
        tipoPagina: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    updatePagina(id: number, updatePaginaDto: CreatePaginaDto): import("../../../generated/prisma/models").Prisma__PaginaClient<{
        idPaginas: number;
        nomePagina: string;
        tipoPagina: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
}
