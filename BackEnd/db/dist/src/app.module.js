"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("./prisma/prisma.module");
const horarios_aula_module_1 = require("./tables/horarios-aula/horarios-aula.module");
const paginas_module_1 = require("./tables/paginas/paginas.module");
const salas_module_1 = require("./tables/salas/salas.module");
const textos_module_1 = require("./tables/textos/textos.module");
const vagas_emprego_module_1 = require("./tables/vagas-emprego/vagas-emprego.module");
const vagas_estagio_module_1 = require("./tables/vagas-estagio/vagas-estagio.module");
const usuarios_module_1 = require("./tables/usuarios/usuarios.module");
const login_module_1 = require("./modulos/login/login.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            horarios_aula_module_1.HorariosAulaModule,
            paginas_module_1.PaginasModule,
            salas_module_1.SalasModule,
            textos_module_1.TextosModule,
            vagas_emprego_module_1.VagasEmpregoModule,
            vagas_estagio_module_1.VagasEstagioModule,
            usuarios_module_1.UsuariosModule,
            login_module_1.LoginModule
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map