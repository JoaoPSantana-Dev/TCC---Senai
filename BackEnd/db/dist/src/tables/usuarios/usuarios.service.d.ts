import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { PrismaService } from "../../prisma/prisma.service";
export declare class UsuariosService {
    private prisma;
    constructor(prisma: PrismaService);
    criarUsuario(createUsuarioDto: CreateUsuarioDto): import("../../../generated/prisma/models").Prisma__UsuarioClient<{
        idUsuario: number;
        nome: string;
        email: string;
        senha: string;
        funcao: string;
        unidade: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    listarTodosUsuarios(): import("../../../generated/prisma/internal/prismaNamespace").PrismaPromise<{
        idUsuario: number;
        nome: string;
        email: string;
        senha: string;
        funcao: string;
        unidade: string;
    }[]>;
    listarUmUsuario(id: number): import("../../../generated/prisma/models").Prisma__UsuarioClient<{
        idUsuario: number;
        nome: string;
        email: string;
        senha: string;
        funcao: string;
        unidade: string;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    apagarUsuario(id: number): import("../../../generated/prisma/models").Prisma__UsuarioClient<{
        idUsuario: number;
        nome: string;
        email: string;
        senha: string;
        funcao: string;
        unidade: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    updateUsuario(id: number, updateUsuarioDTO: CreateUsuarioDto): import("../../../generated/prisma/models").Prisma__UsuarioClient<{
        idUsuario: number;
        nome: string;
        email: string;
        senha: string;
        funcao: string;
        unidade: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
}
