import { PrismaService } from "../../prisma/prisma.service";
export declare class LoginService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    login(email: string, senha: string): Promise<{
        mensagem: string;
        usuario: {
            id: number;
            nome: string;
            email: string;
        };
    }>;
}
