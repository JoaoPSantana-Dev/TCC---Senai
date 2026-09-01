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
exports.VagasEmpregoController = void 0;
const common_1 = require("@nestjs/common");
const vagas_emprego_service_1 = require("./vagas-emprego.service");
const create_vaga_emprego_dto_1 = require("../dto/create-vaga-emprego.dto");
let VagasEmpregoController = class VagasEmpregoController {
    vagasEmpregoService;
    constructor(vagasEmpregoService) {
        this.vagasEmpregoService = vagasEmpregoService;
    }
    criarVagasEmprego(createVagaEmpregoDto) {
        return this.vagasEmpregoService.criarVagaEmprego(createVagaEmpregoDto);
    }
    listarTodasVagasEmprego() {
        return this.vagasEmpregoService.listarTodasVagasEmprego();
    }
    listarUmaVagaEmprego(id) {
        return this.vagasEmpregoService.listarUmaVagaEmprego(+id);
    }
    apagarVagaEmprego(id) {
        return this.vagasEmpregoService.apagarVagaEmprego(+id);
    }
    updateVagaEmprego(id, updateVagaEmpregoDTO) {
        return this.vagasEmpregoService.updateVagaEmprego(+id, updateVagaEmpregoDTO);
    }
};
exports.VagasEmpregoController = VagasEmpregoController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_vaga_emprego_dto_1.CreateVagaEmpregoDto]),
    __metadata("design:returntype", void 0)
], VagasEmpregoController.prototype, "criarVagasEmprego", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VagasEmpregoController.prototype, "listarTodasVagasEmprego", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VagasEmpregoController.prototype, "listarUmaVagaEmprego", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VagasEmpregoController.prototype, "apagarVagaEmprego", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_vaga_emprego_dto_1.CreateVagaEmpregoDto]),
    __metadata("design:returntype", void 0)
], VagasEmpregoController.prototype, "updateVagaEmprego", null);
exports.VagasEmpregoController = VagasEmpregoController = __decorate([
    (0, common_1.Controller)('vagas-emprego'),
    __metadata("design:paramtypes", [vagas_emprego_service_1.VagasEmpregoService])
], VagasEmpregoController);
//# sourceMappingURL=vagas-emprego.controller.js.map