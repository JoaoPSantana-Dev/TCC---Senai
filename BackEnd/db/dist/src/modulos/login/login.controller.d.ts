import { LoginService } from './login.service';
export declare class LoginController {
    private readonly loginService;
    constructor(loginService: LoginService);
    login(body: {
        email: string;
        senha: string;
    }): Promise<{
        mensagem: string;
        usuario: {
            id: number;
            nome: string;
            email: string;
        };
    }>;
}
