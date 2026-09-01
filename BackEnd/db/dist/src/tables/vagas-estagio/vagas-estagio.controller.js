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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VagasEstagioController = void 0;
const common_1 = require("@nestjs/common");
const vagas_estagio_service_1 = require("./vagas-estagio.service");
const create_vaga_estagio_dto_1 = require("../dto/create.vaga-estagio.dto");
let VagasEstagioController = class VagasEstagioController {
    vagasEstagioService;
    constructor(vagasEstagioService) {
        this.vagasEstagioService = vagasEstagioService;
    }
    criarVagaEstagio(createVagaEstagioDto) {
        return this.vagasEstagioService.criarVagaEstagio(createVagaEstagioDto);
    }
    listarTodasVagasEstagio() {
        return this.vagasEstagioService.listarTodasVagasEstagio();
    }
    listarUmaVagaEstagio(id) {
        return this.vagasEstagioService.listarUmaVagaEstagio(+id);
    }
    apagarVagaEstagio(id) {
        return this.vagasEstagioService.apagarVagaEstagio(+id);
    }
    updateVagaEstagio(id, updateVagaEstagioDTO) {
        return this.vagasEstagioService.updateVagaEstagio(+id, updateVagaEstagioDTO);
    }
};
exports.VagasEstagioController = VagasEstagioController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_vaga_estagio_dto_1.CreateVagaEstagioDto]),
    __metadata("design:returntype", void 0)
], VagasEstagioController.prototype, "criarVagaEstagio", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VagasEstagioController.prototype, "listarTodasVagasEstagio", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VagasEstagioController.prototype, "listarUmaVagaEstagio", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VagasEstagioController.prototype, "apagarVagaEstagio", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_vaga_estagio_dto_1.CreateVagaEstagioDto]),
    __metadata("design:returntype", void 0)
], VagasEstagioController.prototype, "updateVagaEstagio", null);
exports.VagasEstagioController = VagasEstagioController = __decorate([
    (0, common_1.Controller)('vagas-estagio'),
    __metadata("design:paramtypes", [vagas_estagio_service_1.VagasEstagioService])
], VagasEstagioController);
//# sourceMappingURL=vagas-estagio.controller.js.map