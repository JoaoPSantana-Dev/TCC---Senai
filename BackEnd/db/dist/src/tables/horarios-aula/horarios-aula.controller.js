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
exports.HorariosAulaController = void 0;
const common_1 = require("@nestjs/common");
const horarios_aula_service_1 = require("./horarios-aula.service");
const create_horario_aula_dto_1 = require("../dto/create-horario-aula.dto");
let HorariosAulaController = class HorariosAulaController {
    horariosAulaService;
    constructor(horariosAulaService) {
        this.horariosAulaService = horariosAulaService;
    }
    criarHorarioAula(createHorarioAulaDto) {
        return this.horariosAulaService.criarHorarioAula(createHorarioAulaDto);
    }
    listarTodosHorarios() {
        return this.horariosAulaService.listarTodosHorarios();
    }
    listarUmHorario(id) {
        return this.horariosAulaService.listarUmHorario(id);
    }
    apagarAula(id) {
        return this.horariosAulaService.apagarAula(+id);
    }
    updateAula(id, updateAulaDto) {
        return this.horariosAulaService.updateAula(id, updateAulaDto);
    }
};
exports.HorariosAulaController = HorariosAulaController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_horario_aula_dto_1.CreateHorarioAulaDto]),
    __metadata("design:returntype", void 0)
], HorariosAulaController.prototype, "criarHorarioAula", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HorariosAulaController.prototype, "listarTodosHorarios", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HorariosAulaController.prototype, "listarUmHorario", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], HorariosAulaController.prototype, "apagarAula", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_horario_aula_dto_1.CreateHorarioAulaDto]),
    __metadata("design:returntype", void 0)
], HorariosAulaController.prototype, "updateAula", null);
exports.HorariosAulaController = HorariosAulaController = __decorate([
    (0, common_1.Controller)('horarios-aula'),
    __metadata("design:paramtypes", [horarios_aula_service_1.HorariosAulaService])
], HorariosAulaController);
//# sourceMappingURL=horarios-aula.controller.js.map