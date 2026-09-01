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
exports.PaginasController = void 0;
const common_1 = require("@nestjs/common");
const paginas_service_1 = require("./paginas.service");
const create_pagina_dto_1 = require("../dto/create-pagina.dto");
let PaginasController = class PaginasController {
    paginaService;
    constructor(paginaService) {
        this.paginaService = paginaService;
    }
    criarPagina(createPaginaDto) {
        return this.paginaService.criarPagina(createPaginaDto);
    }
    listarTodasPaginas() {
        return this.paginaService.listarTodasPaginas();
    }
    listarUmaPagina(id) {
        return this.paginaService.listarUmaPagina(id);
    }
    apagarPagina(id) {
        return this.paginaService.apagarPagina(+id);
    }
    updatePagina(id, updatePaginaDto) {
        return this.paginaService.updatePagina(id, updatePaginaDto);
    }
};
exports.PaginasController = PaginasController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_pagina_dto_1.CreatePaginaDto]),
    __metadata("design:returntype", void 0)
], PaginasController.prototype, "criarPagina", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PaginasController.prototype, "listarTodasPaginas", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PaginasController.prototype, "listarUmaPagina", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PaginasController.prototype, "apagarPagina", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_pagina_dto_1.CreatePaginaDto]),
    __metadata("design:returntype", void 0)
], PaginasController.prototype, "updatePagina", null);
exports.PaginasController = PaginasController = __decorate([
    (0, common_1.Controller)('paginas'),
    __metadata("design:paramtypes", [paginas_service_1.PaginasService])
], PaginasController);
//# sourceMappingURL=paginas.controller.js.map