"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalasModule = void 0;
const common_1 = require("@nestjs/common");
const salas_controller_1 = require("./salas.controller");
const salas_service_1 = require("./salas.service");
let SalasModule = class SalasModule {
};
exports.SalasModule = SalasModule;
exports.SalasModule = SalasModule = __decorate([
    (0, common_1.Module)({
        controllers: [salas_controller_1.SalasController],
        providers: [salas_service_1.SalasService]
    })
], SalasModule);
//# sourceMappingURL=salas.module.js.map