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
exports.TextosController = void 0;
const common_1 = require("@nestjs/common");
const textos_service_1 = require("./textos.service");
const create_texto_dto_1 = require("../dto/create-texto.dto");
let TextosController = class TextosController {
    textosService;
    constructor(textosService) {
        this.textosService = textosService;
    }
    criarTexto(createTextoDto) {
        return this.textosService.criarTexto(createTextoDto);
    }
    listarTodosTextos() {
        return this.textosService.listarTodosTextos();
    }
    listarUmTexto(id) {
        return this.textosService.listarUmTexto(id);
    }
    apagarTexto(id) {
        return this.textosService.apagarTexto(+id);
    }
    updateAula(id, updateTextoDto) {
        return this.textosService.updateTexto(id, updateTextoDto);
    }
};
exports.TextosController = TextosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_texto_dto_1.CreateTextoDto]),
    __metadata("design:returntype", void 0)
], TextosController.prototype, "criarTexto", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TextosController.prototype, "listarTodosTextos", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TextosController.prototype, "listarUmTexto", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TextosController.prototype, "apagarTexto", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_texto_dto_1.CreateTextoDto]),
    __metadata("design:returntype", void 0)
], TextosController.prototype, "updateAula", null);
exports.TextosController = TextosController = __decorate([
    (0, common_1.Controller)('textos'),
    __metadata("design:paramtypes", [textos_service_1.TextosService])
], TextosController);
//# sourceMappingURL=textos.controller.js.map