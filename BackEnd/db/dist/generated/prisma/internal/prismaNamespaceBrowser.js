"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.HorarioAulaOrderByRelevanceFieldEnum = exports.SalaOrderByRelevanceFieldEnum = exports.VagaEstagioOrderByRelevanceFieldEnum = exports.VagaEmpregoOrderByRelevanceFieldEnum = exports.TextoOrderByRelevanceFieldEnum = exports.PaginaOrderByRelevanceFieldEnum = exports.UsuarioOrderByRelevanceFieldEnum = exports.SortOrder = exports.HorarioAulaScalarFieldEnum = exports.SalaScalarFieldEnum = exports.VagaEstagioScalarFieldEnum = exports.VagaEmpregoScalarFieldEnum = exports.TextoScalarFieldEnum = exports.PaginaScalarFieldEnum = exports.UsuarioScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.Decimal = void 0;
const runtime = __importStar(require("@prisma/client/runtime/index-browser"));
exports.Decimal = runtime.Decimal;
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    Usuario: 'Usuario',
    Pagina: 'Pagina',
    Texto: 'Texto',
    VagaEmprego: 'VagaEmprego',
    VagaEstagio: 'VagaEstagio',
    Sala: 'Sala',
    HorarioAula: 'HorarioAula'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.UsuarioScalarFieldEnum = {
    idUsuario: 'idUsuario',
    nome: 'nome',
    email: 'email',
    senha: 'senha',
    funcao: 'funcao',
    unidade: 'unidade'
};
exports.PaginaScalarFieldEnum = {
    idPaginas: 'idPaginas',
    nomePagina: 'nomePagina',
    tipoPagina: 'tipoPagina'
};
exports.TextoScalarFieldEnum = {
    idTextos: 'idTextos',
    texto: 'texto',
    tipoTexto: 'tipoTexto',
    idPagina: 'idPagina'
};
exports.VagaEmpregoScalarFieldEnum = {
    idEmprego: 'idEmprego',
    nomeEmpresa: 'nomeEmpresa',
    cargo: 'cargo',
    requisitos: 'requisitos',
    salario: 'salario',
    beneficios: 'beneficios',
    descricao: 'descricao',
    localizacao: 'localizacao',
    contato: 'contato',
    areaEmprego: 'areaEmprego'
};
exports.VagaEstagioScalarFieldEnum = {
    idEstagio: 'idEstagio',
    nomeEmpresa: 'nomeEmpresa',
    cargo: 'cargo',
    requisitos: 'requisitos',
    salario: 'salario',
    beneficios: 'beneficios',
    descricao: 'descricao',
    localizacao: 'localizacao',
    contato: 'contato',
    areaEstagio: 'areaEstagio'
};
exports.SalaScalarFieldEnum = {
    idSala: 'idSala',
    nomeSala: 'nomeSala',
    andar: 'andar',
    bloco: 'bloco',
    imagem: 'imagem'
};
exports.HorarioAulaScalarFieldEnum = {
    idHorariosAula: 'idHorariosAula',
    nomeCurso: 'nomeCurso',
    turno: 'turno',
    idSala: 'idSala'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.UsuarioOrderByRelevanceFieldEnum = {
    nome: 'nome',
    email: 'email',
    senha: 'senha',
    funcao: 'funcao',
    unidade: 'unidade'
};
exports.PaginaOrderByRelevanceFieldEnum = {
    nomePagina: 'nomePagina',
    tipoPagina: 'tipoPagina'
};
exports.TextoOrderByRelevanceFieldEnum = {
    texto: 'texto',
    tipoTexto: 'tipoTexto'
};
exports.VagaEmpregoOrderByRelevanceFieldEnum = {
    nomeEmpresa: 'nomeEmpresa',
    cargo: 'cargo',
    requisitos: 'requisitos',
    salario: 'salario',
    beneficios: 'beneficios',
    descricao: 'descricao',
    localizacao: 'localizacao',
    contato: 'contato',
    areaEmprego: 'areaEmprego'
};
exports.VagaEstagioOrderByRelevanceFieldEnum = {
    nomeEmpresa: 'nomeEmpresa',
    cargo: 'cargo',
    requisitos: 'requisitos',
    salario: 'salario',
    beneficios: 'beneficios',
    descricao: 'descricao',
    localizacao: 'localizacao',
    contato: 'contato',
    areaEstagio: 'areaEstagio'
};
exports.SalaOrderByRelevanceFieldEnum = {
    nomeSala: 'nomeSala',
    andar: 'andar',
    bloco: 'bloco',
    imagem: 'imagem'
};
exports.HorarioAulaOrderByRelevanceFieldEnum = {
    nomeCurso: 'nomeCurso',
    turno: 'turno'
};
//# sourceMappingURL=prismaNamespaceBrowser.js.map