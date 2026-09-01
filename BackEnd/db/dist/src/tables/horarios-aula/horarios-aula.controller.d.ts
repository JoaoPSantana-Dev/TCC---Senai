import { HorariosAulaService } from "./horarios-aula.service";
import { CreateHorarioAulaDto } from "../dto/create-horario-aula.dto";
export declare class HorariosAulaController {
    private readonly horariosAulaService;
    constructor(horariosAulaService: HorariosAulaService);
    criarHorarioAula(createHorarioAulaDto: CreateHorarioAulaDto): import("../../../generated/prisma/models").Prisma__HorarioAulaClient<{
        idSala: number;
        idHorariosAula: number;
        nomeCurso: string;
        turno: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    listarTodosHorarios(): import("../../../generated/prisma/internal/prismaNamespace").PrismaPromise<({
        sala: {
            idSala: number;
            nomeSala: string;
            andar: string;
            bloco: string;
            imagem: string;
        };
    } & {
        idSala: number;
        idHorariosAula: number;
        nomeCurso: string;
        turno: string;
    })[]>;
    listarUmHorario(id: number): import("../../../generated/prisma/models").Prisma__HorarioAulaClient<({
        sala: {
            idSala: number;
            nomeSala: string;
            andar: string;
            bloco: string;
            imagem: string;
        };
    } & {
        idSala: number;
        idHorariosAula: number;
        nomeCurso: string;
        turno: string;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    apagarAula(id: number): import("../../../generated/prisma/models").Prisma__HorarioAulaClient<{
        idSala: number;
        idHorariosAula: number;
        nomeCurso: string;
        turno: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    updateAula(id: number, updateAulaDto: CreateHorarioAulaDto): import("../../../generated/prisma/models").Prisma__HorarioAulaClient<{
        idSala: number;
        idHorariosAula: number;
        nomeCurso: string;
        turno: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
}
