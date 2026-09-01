import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly Usuario: "Usuario";
    readonly Pagina: "Pagina";
    readonly Texto: "Texto";
    readonly VagaEmprego: "VagaEmprego";
    readonly VagaEstagio: "VagaEstagio";
    readonly Sala: "Sala";
    readonly HorarioAula: "HorarioAula";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UsuarioScalarFieldEnum: {
    readonly idUsuario: "idUsuario";
    readonly nome: "nome";
    readonly email: "email";
    readonly senha: "senha";
    readonly funcao: "funcao";
    readonly unidade: "unidade";
};
export type UsuarioScalarFieldEnum = (typeof UsuarioScalarFieldEnum)[keyof typeof UsuarioScalarFieldEnum];
export declare const PaginaScalarFieldEnum: {
    readonly idPaginas: "idPaginas";
    readonly nomePagina: "nomePagina";
    readonly tipoPagina: "tipoPagina";
};
export type PaginaScalarFieldEnum = (typeof PaginaScalarFieldEnum)[keyof typeof PaginaScalarFieldEnum];
export declare const TextoScalarFieldEnum: {
    readonly idTextos: "idTextos";
    readonly texto: "texto";
    readonly tipoTexto: "tipoTexto";
    readonly idPagina: "idPagina";
};
export type TextoScalarFieldEnum = (typeof TextoScalarFieldEnum)[keyof typeof TextoScalarFieldEnum];
export declare const VagaEmpregoScalarFieldEnum: {
    readonly idEmprego: "idEmprego";
    readonly nomeEmpresa: "nomeEmpresa";
    readonly cargo: "cargo";
    readonly requisitos: "requisitos";
    readonly salario: "salario";
    readonly beneficios: "beneficios";
    readonly descricao: "descricao";
    readonly localizacao: "localizacao";
    readonly contato: "contato";
    readonly areaEmprego: "areaEmprego";
};
export type VagaEmpregoScalarFieldEnum = (typeof VagaEmpregoScalarFieldEnum)[keyof typeof VagaEmpregoScalarFieldEnum];
export declare const VagaEstagioScalarFieldEnum: {
    readonly idEstagio: "idEstagio";
    readonly nomeEmpresa: "nomeEmpresa";
    readonly cargo: "cargo";
    readonly requisitos: "requisitos";
    readonly salario: "salario";
    readonly beneficios: "beneficios";
    readonly descricao: "descricao";
    readonly localizacao: "localizacao";
    readonly contato: "contato";
    readonly areaEstagio: "areaEstagio";
};
export type VagaEstagioScalarFieldEnum = (typeof VagaEstagioScalarFieldEnum)[keyof typeof VagaEstagioScalarFieldEnum];
export declare const SalaScalarFieldEnum: {
    readonly idSala: "idSala";
    readonly nomeSala: "nomeSala";
    readonly andar: "andar";
    readonly bloco: "bloco";
    readonly imagem: "imagem";
};
export type SalaScalarFieldEnum = (typeof SalaScalarFieldEnum)[keyof typeof SalaScalarFieldEnum];
export declare const HorarioAulaScalarFieldEnum: {
    readonly idHorariosAula: "idHorariosAula";
    readonly nomeCurso: "nomeCurso";
    readonly turno: "turno";
    readonly idSala: "idSala";
};
export type HorarioAulaScalarFieldEnum = (typeof HorarioAulaScalarFieldEnum)[keyof typeof HorarioAulaScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const UsuarioOrderByRelevanceFieldEnum: {
    readonly nome: "nome";
    readonly email: "email";
    readonly senha: "senha";
    readonly funcao: "funcao";
    readonly unidade: "unidade";
};
export type UsuarioOrderByRelevanceFieldEnum = (typeof UsuarioOrderByRelevanceFieldEnum)[keyof typeof UsuarioOrderByRelevanceFieldEnum];
export declare const PaginaOrderByRelevanceFieldEnum: {
    readonly nomePagina: "nomePagina";
    readonly tipoPagina: "tipoPagina";
};
export type PaginaOrderByRelevanceFieldEnum = (typeof PaginaOrderByRelevanceFieldEnum)[keyof typeof PaginaOrderByRelevanceFieldEnum];
export declare const TextoOrderByRelevanceFieldEnum: {
    readonly texto: "texto";
    readonly tipoTexto: "tipoTexto";
};
export type TextoOrderByRelevanceFieldEnum = (typeof TextoOrderByRelevanceFieldEnum)[keyof typeof TextoOrderByRelevanceFieldEnum];
export declare const VagaEmpregoOrderByRelevanceFieldEnum: {
    readonly nomeEmpresa: "nomeEmpresa";
    readonly cargo: "cargo";
    readonly requisitos: "requisitos";
    readonly salario: "salario";
    readonly beneficios: "beneficios";
    readonly descricao: "descricao";
    readonly localizacao: "localizacao";
    readonly contato: "contato";
    readonly areaEmprego: "areaEmprego";
};
export type VagaEmpregoOrderByRelevanceFieldEnum = (typeof VagaEmpregoOrderByRelevanceFieldEnum)[keyof typeof VagaEmpregoOrderByRelevanceFieldEnum];
export declare const VagaEstagioOrderByRelevanceFieldEnum: {
    readonly nomeEmpresa: "nomeEmpresa";
    readonly cargo: "cargo";
    readonly requisitos: "requisitos";
    readonly salario: "salario";
    readonly beneficios: "beneficios";
    readonly descricao: "descricao";
    readonly localizacao: "localizacao";
    readonly contato: "contato";
    readonly areaEstagio: "areaEstagio";
};
export type VagaEstagioOrderByRelevanceFieldEnum = (typeof VagaEstagioOrderByRelevanceFieldEnum)[keyof typeof VagaEstagioOrderByRelevanceFieldEnum];
export declare const SalaOrderByRelevanceFieldEnum: {
    readonly nomeSala: "nomeSala";
    readonly andar: "andar";
    readonly bloco: "bloco";
    readonly imagem: "imagem";
};
export type SalaOrderByRelevanceFieldEnum = (typeof SalaOrderByRelevanceFieldEnum)[keyof typeof SalaOrderByRelevanceFieldEnum];
export declare const HorarioAulaOrderByRelevanceFieldEnum: {
    readonly nomeCurso: "nomeCurso";
    readonly turno: "turno";
};
export type HorarioAulaOrderByRelevanceFieldEnum = (typeof HorarioAulaOrderByRelevanceFieldEnum)[keyof typeof HorarioAulaOrderByRelevanceFieldEnum];
