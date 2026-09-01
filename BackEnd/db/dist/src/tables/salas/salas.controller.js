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
exports.SalasController = void 0;
const common_1 = require("@nestjs/common");
const salas_service_1 = require("./salas.service");
const create_sala_dto_1 = require("../dto/create-sala.dto");
let SalasController = class SalasController {
    salasService;
    constructor(salasService) {
        this.salasService = salasService;
    }
    criarSala(createSalaDto) {
        return this.salasService.criarSala(createSalaDto);
    }
    listarTodasSalas() {
        return this.salasService.listarTodasSalas();
    }
    listarUmaSala(id) {
        return this.salasService.listarUmaSala(id);
    }
    apagarSala(id) {
        return this.salasService.apagarSala(+id);
    }
    updateSala(id, updateSalaDto) {
        return this.salasService.updateSala(id, updateSalaDto);
    }
};
exports.SalasController = SalasController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sala_dto_1.CreateSalaDto]),
    __metadata("design:returntype", void 0)
], SalasController.prototype, "criarSala", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SalasController.prototype, "listarTodasSalas", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SalasController.prototype, "listarUmaSala", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], SalasController.prototype, "apagarSala", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_sala_dto_1.CreateSalaDto]),
    __metadata("design:returntype", void 0)
], SalasController.prototype, "updateSala", null);
exports.SalasController = SalasController = __decorate([
    (0, common_1.Controller)('salas'),
    __metadata("design:paramtypes", [salas_service_1.SalasService])
], SalasController);
//# sourceMappingURL=salas.controller.js.map