import { CreateSalaDto } from "../dto/create-sala.dto";
import { PrismaService } from "../../prisma/prisma.service";
export declare class SalasService {
    private prisma;
    constructor(prisma: PrismaService);
    criarSala(createSalaDto: CreateSalaDto): import("../../../generated/prisma/models").Prisma__SalaClient<{
        idSala: number;
        nomeSala: string;
        andar: string;
        bloco: string;
        imagem: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    listarTodasSalas(): import("../../../generated/prisma/internal/prismaNamespace").PrismaPromise<({
        horarios: {
            idSala: number;
            idHorariosAula: number;
            nomeCurso: string;
            turno: string;
        }[];
    } & {
        idSala: number;
        nomeSala: string;
        andar: string;
        bloco: string;
        imagem: string;
    })[]>;
    listarUmaSala(id: number): import("../../../generated/prisma/models").Prisma__SalaClient<({
        horarios: {
            idSala: number;
            idHorariosAula: number;
            nomeCurso: string;
            turno: string;
        }[];
    } & {
        idSala: number;
        nomeSala: string;
        andar: string;
        bloco: string;
        imagem: string;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    apagarSala(id: number): import("../../../generated/prisma/models").Prisma__SalaClient<{
        idSala: number;
        nomeSala: string;
        andar: string;
        bloco: string;
        imagem: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    updateSala(id: number, updateSalaDto: CreateSalaDto): import("../../../generated/prisma/models").Prisma__SalaClient<{
        idSala: number;
        nomeSala: string;
        andar: string;
        bloco: string;
        imagem: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
}
