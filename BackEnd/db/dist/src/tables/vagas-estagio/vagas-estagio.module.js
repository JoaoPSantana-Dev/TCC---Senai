"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VagasEstagioModule = void 0;
const common_1 = require("@nestjs/common");
const vagas_estagio_controller_1 = require("./vagas-estagio.controller");
const vagas_estagio_service_1 = require("./vagas-estagio.service");
let VagasEstagioModule = class VagasEstagioModule {
};
exports.VagasEstagioModule = VagasEstagioModule;
exports.VagasEstagioModule = VagasEstagioModule = __decorate([
    (0, common_1.Module)({
        controllers: [vagas_estagio_controller_1.VagasEstagioController],
        providers: [vagas_estagio_service_1.VagasEstagioService]
    })
], VagasEstagioModule);
//# sourceMappingURL=vagas-estagio.module.js.map