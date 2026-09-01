import { VagasEmpregoService } from "./vagas-emprego.service";
import { CreateVagaEmpregoDto } from "../dto/create-vaga-emprego.dto";
export declare class VagasEmpregoController {
    private readonly vagasEmpregoService;
    constructor(vagasEmpregoService: VagasEmpregoService);
    criarVagasEmprego(createVagaEmpregoDto: CreateVagaEmpregoDto): import("../../../generated/prisma/models").Prisma__VagaEmpregoClient<{
        idEmprego: number;
        nomeEmpresa: string;
        cargo: string;
        requisitos: string;
        salario: string;
        beneficios: string;
        descricao: string;
        localizacao: string;
        contato: string;
        areaEmprego: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    listarTodasVagasEmprego(): import("../../../generated/prisma/internal/prismaNamespace").PrismaPromise<{
        idEmprego: number;
        nomeEmpresa: string;
        cargo: string;
        requisitos: string;
        salario: string;
        beneficios: string;
        descricao: string;
        localizacao: string;
        contato: string;
        areaEmprego: string;
    }[]>;
    listarUmaVagaEmprego(id: number): import("../../../generated/prisma/models").Prisma__VagaEmpregoClient<{
        idEmprego: number;
        nomeEmpresa: string;
        cargo: string;
        requisitos: string;
        salario: string;
        beneficios: string;
        descricao: string;
        localizacao: string;
        contato: string;
        areaEmprego: string;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    apagarVagaEmprego(id: number): import("../../../generated/prisma/models").Prisma__VagaEmpregoClient<{
        idEmprego: number;
        nomeEmpresa: string;
        cargo: string;
        requisitos: string;
        salario: string;
        beneficios: string;
        descricao: string;
        localizacao: string;
        contato: string;
        areaEmprego: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    updateVagaEmprego(id: number, updateVagaEmpregoDTO: CreateVagaEmpregoDto): import("../../../generated/prisma/models").Prisma__VagaEmpregoClient<{
        idEmprego: number;
        nomeEmpresa: string;
        cargo: string;
        requisitos: string;
        salario: string;
        beneficios: string;
        descricao: string;
        localizacao: string;
        contato: string;
        areaEmprego: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
}
