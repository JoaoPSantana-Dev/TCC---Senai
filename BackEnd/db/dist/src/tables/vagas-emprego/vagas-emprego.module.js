"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VagasEmpregoModule = void 0;
const common_1 = require("@nestjs/common");
const vagas_emprego_controller_1 = require("./vagas-emprego.controller");
const vagas_emprego_service_1 = require("./vagas-emprego.service");
let VagasEmpregoModule = class VagasEmpregoModule {
};
exports.VagasEmpregoModule = VagasEmpregoModule;
exports.VagasEmpregoModule = VagasEmpregoModule = __decorate([
    (0, common_1.Module)({
        controllers: [vagas_emprego_controller_1.VagasEmpregoController],
        providers: [vagas_emprego_service_1.VagasEmpregoService]
    })
], VagasEmpregoModule);
//# sourceMappingURL=vagas-emprego.module.js.map