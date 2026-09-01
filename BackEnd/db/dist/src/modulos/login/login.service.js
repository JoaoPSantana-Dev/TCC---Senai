"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let LoginService = class LoginService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async login(email, senha) {
        const usuario = await this.prisma.usuario.findFirst({
            where: { email: email },
        });
        if (!usuario) {
            throw new common_1.UnauthorizedException("Email ou senha incorretos");
        }
        if (usuario.senha !== senha) {
            throw new common_1.UnauthorizedException("Email ou senha incorretos");
        }
        return {
            mensagem: "Login realizado com sucesso",
            usuario: {
                id: usuario.idUsuario,
                nome: usuario.nome,
                email: usuario.email,
            },
        };
    }
};
exports.LoginService = LoginService;
exports.LoginService = LoginService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LoginService);
//# sourceMappingURL=login.service.js.map