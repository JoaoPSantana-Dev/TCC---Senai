import { CreateVagaEstagioDto } from "../dto/create.vaga-estagio.dto";
import { PrismaService } from "../../prisma/prisma.service";
export declare class VagasEstagioService {
    private prisma;
    constructor(prisma: PrismaService);
    criarVagaEstagio(createVagaEstagioDto: CreateVagaEstagioDto): import("../../../generated/prisma/models").Prisma__VagaEstagioClient<{
        nomeEmpresa: string;
        cargo: string;
        requisitos: string;
        salario: string;
        beneficios: string;
        descricao: string;
        localizacao: string;
        contato: string;
        idEstagio: number;
        areaEstagio: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    listarTodasVagasEstagio(): import("../../../generated/prisma/internal/prismaNamespace").PrismaPromise<{
        nomeEmpresa: string;
        cargo: string;
        requisitos: string;
        salario: string;
        beneficios: string;
        descricao: string;
        localizacao: string;
        contato: string;
        idEstagio: number;
        areaEstagio: string;
    }[]>;
    listarUmaVagaEstagio(id: number): import("../../../generated/prisma/models").Prisma__VagaEstagioClient<{
        nomeEmpresa: string;
        cargo: string;
        requisitos: string;
        salario: string;
        beneficios: string;
        descricao: string;
        localizacao: string;
        contato: string;
        idEstagio: number;
        areaEstagio: string;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    apagarVagaEstagio(id: number): import("../../../generated/prisma/models").Prisma__VagaEstagioClient<{
        nomeEmpresa: string;
        cargo: string;
        requisitos: string;
        salario: string;
        beneficios: string;
        descricao: string;
        localizacao: string;
        contato: string;
        idEstagio: number;
        areaEstagio: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    updateVagaEstagio(id: number, updateVagaEstagioDTO: CreateVagaEstagioDto): import("../../../generated/prisma/models").Prisma__VagaEstagioClient<{
        nomeEmpresa: string;
        cargo: string;
        requisitos: string;
        salario: string;
        beneficios: string;
        descricao: string;
        localizacao: string;
        contato: string;
        idEstagio: number;
        areaEstagio: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
}
