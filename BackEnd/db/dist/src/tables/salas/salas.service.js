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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalasService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let SalasService = class SalasService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    criarSala(createSalaDto) {
        return this.prisma.sala.create({
            data: createSalaDto
        });
    }
    listarTodasSalas() {
        return this.prisma.sala.findMany({
            include: { horarios: true, },
        });
    }
    listarUmaSala(id) {
        return this.prisma.sala.findUnique({
            where: { idSala: id },
            include: { horarios: true, }
        });
    }
    apagarSala(id) {
        return this.prisma.sala.delete({
            where: { idSala: id }
        });
    }
    updateSala(id, updateSalaDto) {
        return this.prisma.sala.update({
            where: { idSala: id },
            data: updateSalaDto
        });
    }
};
exports.SalasService = SalasService;
exports.SalasService = SalasService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SalasService);
//# sourceMappingURL=salas.service.js.map