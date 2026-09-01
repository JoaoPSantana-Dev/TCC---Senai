import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models.js";
import { type PrismaClient } from "./class.js";
export type * from '../models.js';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
export declare const prismaVersion: PrismaVersion;
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: runtime.DbNullClass;
export declare const JsonNull: runtime.JsonNullClass;
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> = [
    PrismaClientOptions
] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
export type XOR<T, U> = T extends object ? U extends object ? ((Without<T, U> & U) | (Without<U, T> & T)) & object : U : T;
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
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
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "usuario" | "pagina" | "texto" | "vagaEmprego" | "vagaEstagio" | "sala" | "horarioAula";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        Usuario: {
            payload: Prisma.$UsuarioPayload<ExtArgs>;
            fields: Prisma.UsuarioFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UsuarioFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsuarioPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UsuarioFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsuarioPayload>;
                };
                findFirst: {
                    args: Prisma.UsuarioFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsuarioPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UsuarioFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsuarioPayload>;
                };
                findMany: {
                    args: Prisma.UsuarioFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsuarioPayload>[];
                };
                create: {
                    args: Prisma.UsuarioCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsuarioPayload>;
                };
                createMany: {
                    args: Prisma.UsuarioCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.UsuarioDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsuarioPayload>;
                };
                update: {
                    args: Prisma.UsuarioUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsuarioPayload>;
                };
                deleteMany: {
                    args: Prisma.UsuarioDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UsuarioUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.UsuarioUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UsuarioPayload>;
                };
                aggregate: {
                    args: Prisma.UsuarioAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUsuario>;
                };
                groupBy: {
                    args: Prisma.UsuarioGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UsuarioGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UsuarioCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UsuarioCountAggregateOutputType> | number;
                };
            };
        };
        Pagina: {
            payload: Prisma.$PaginaPayload<ExtArgs>;
            fields: Prisma.PaginaFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PaginaFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaginaPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PaginaFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaginaPayload>;
                };
                findFirst: {
                    args: Prisma.PaginaFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaginaPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PaginaFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaginaPayload>;
                };
                findMany: {
                    args: Prisma.PaginaFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaginaPayload>[];
                };
                create: {
                    args: Prisma.PaginaCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaginaPayload>;
                };
                createMany: {
                    args: Prisma.PaginaCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.PaginaDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaginaPayload>;
                };
                update: {
                    args: Prisma.PaginaUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaginaPayload>;
                };
                deleteMany: {
                    args: Prisma.PaginaDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PaginaUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.PaginaUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PaginaPayload>;
                };
                aggregate: {
                    args: Prisma.PaginaAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePagina>;
                };
                groupBy: {
                    args: Prisma.PaginaGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PaginaGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PaginaCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PaginaCountAggregateOutputType> | number;
                };
            };
        };
        Texto: {
            payload: Prisma.$TextoPayload<ExtArgs>;
            fields: Prisma.TextoFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TextoFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TextoPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TextoFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TextoPayload>;
                };
                findFirst: {
                    args: Prisma.TextoFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TextoPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TextoFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TextoPayload>;
                };
                findMany: {
                    args: Prisma.TextoFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TextoPayload>[];
                };
                create: {
                    args: Prisma.TextoCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TextoPayload>;
                };
                createMany: {
                    args: Prisma.TextoCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.TextoDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TextoPayload>;
                };
                update: {
                    args: Prisma.TextoUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TextoPayload>;
                };
                deleteMany: {
                    args: Prisma.TextoDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TextoUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.TextoUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TextoPayload>;
                };
                aggregate: {
                    args: Prisma.TextoAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTexto>;
                };
                groupBy: {
                    args: Prisma.TextoGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TextoGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TextoCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TextoCountAggregateOutputType> | number;
                };
            };
        };
        VagaEmprego: {
            payload: Prisma.$VagaEmpregoPayload<ExtArgs>;
            fields: Prisma.VagaEmpregoFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.VagaEmpregoFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VagaEmpregoPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.VagaEmpregoFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VagaEmpregoPayload>;
                };
                findFirst: {
                    args: Prisma.VagaEmpregoFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VagaEmpregoPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.VagaEmpregoFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VagaEmpregoPayload>;
                };
                findMany: {
                    args: Prisma.VagaEmpregoFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VagaEmpregoPayload>[];
                };
                create: {
                    args: Prisma.VagaEmpregoCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VagaEmpregoPayload>;
                };
                createMany: {
                    args: Prisma.VagaEmpregoCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.VagaEmpregoDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VagaEmpregoPayload>;
                };
                update: {
                    args: Prisma.VagaEmpregoUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VagaEmpregoPayload>;
                };
                deleteMany: {
                    args: Prisma.VagaEmpregoDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.VagaEmpregoUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.VagaEmpregoUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VagaEmpregoPayload>;
                };
                aggregate: {
                    args: Prisma.VagaEmpregoAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateVagaEmprego>;
                };
                groupBy: {
                    args: Prisma.VagaEmpregoGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VagaEmpregoGroupByOutputType>[];
                };
                count: {
                    args: Prisma.VagaEmpregoCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VagaEmpregoCountAggregateOutputType> | number;
                };
            };
        };
        VagaEstagio: {
            payload: Prisma.$VagaEstagioPayload<ExtArgs>;
            fields: Prisma.VagaEstagioFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.VagaEstagioFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VagaEstagioPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.VagaEstagioFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VagaEstagioPayload>;
                };
                findFirst: {
                    args: Prisma.VagaEstagioFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VagaEstagioPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.VagaEstagioFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VagaEstagioPayload>;
                };
                findMany: {
                    args: Prisma.VagaEstagioFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VagaEstagioPayload>[];
                };
                create: {
                    args: Prisma.VagaEstagioCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VagaEstagioPayload>;
                };
                createMany: {
                    args: Prisma.VagaEstagioCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.VagaEstagioDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VagaEstagioPayload>;
                };
                update: {
                    args: Prisma.VagaEstagioUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VagaEstagioPayload>;
                };
                deleteMany: {
                    args: Prisma.VagaEstagioDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.VagaEstagioUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.VagaEstagioUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$VagaEstagioPayload>;
                };
                aggregate: {
                    args: Prisma.VagaEstagioAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateVagaEstagio>;
                };
                groupBy: {
                    args: Prisma.VagaEstagioGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VagaEstagioGroupByOutputType>[];
                };
                count: {
                    args: Prisma.VagaEstagioCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.VagaEstagioCountAggregateOutputType> | number;
                };
            };
        };
        Sala: {
            payload: Prisma.$SalaPayload<ExtArgs>;
            fields: Prisma.SalaFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SalaFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalaPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SalaFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalaPayload>;
                };
                findFirst: {
                    args: Prisma.SalaFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalaPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SalaFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalaPayload>;
                };
                findMany: {
                    args: Prisma.SalaFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalaPayload>[];
                };
                create: {
                    args: Prisma.SalaCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalaPayload>;
                };
                createMany: {
                    args: Prisma.SalaCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.SalaDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalaPayload>;
                };
                update: {
                    args: Prisma.SalaUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalaPayload>;
                };
                deleteMany: {
                    args: Prisma.SalaDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SalaUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.SalaUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SalaPayload>;
                };
                aggregate: {
                    args: Prisma.SalaAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSala>;
                };
                groupBy: {
                    args: Prisma.SalaGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SalaGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SalaCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SalaCountAggregateOutputType> | number;
                };
            };
        };
        HorarioAula: {
            payload: Prisma.$HorarioAulaPayload<ExtArgs>;
            fields: Prisma.HorarioAulaFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.HorarioAulaFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HorarioAulaPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.HorarioAulaFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HorarioAulaPayload>;
                };
                findFirst: {
                    args: Prisma.HorarioAulaFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HorarioAulaPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.HorarioAulaFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HorarioAulaPayload>;
                };
                findMany: {
                    args: Prisma.HorarioAulaFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HorarioAulaPayload>[];
                };
                create: {
                    args: Prisma.HorarioAulaCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HorarioAulaPayload>;
                };
                createMany: {
                    args: Prisma.HorarioAulaCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.HorarioAulaDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HorarioAulaPayload>;
                };
                update: {
                    args: Prisma.HorarioAulaUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HorarioAulaPayload>;
                };
                deleteMany: {
                    args: Prisma.HorarioAulaDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.HorarioAulaUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.HorarioAulaUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$HorarioAulaPayload>;
                };
                aggregate: {
                    args: Prisma.HorarioAulaAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateHorarioAula>;
                };
                groupBy: {
                    args: Prisma.HorarioAulaGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.HorarioAulaGroupByOutputType>[];
                };
                count: {
                    args: Prisma.HorarioAulaCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.HorarioAulaCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
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
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export interface PrismaClientBaseOptions {
    errorFormat?: ErrorFormat;
    log?: (LogLevel | LogDefinition)[];
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    omit?: GlobalOmitConfig;
    comments?: runtime.SqlCommenterPlugin[];
    queryPlanCacheMaxSize?: number;
}
export interface PrismaClientOptionsWithAccelerateUrl extends PrismaClientBaseOptions {
    accelerateUrl: string;
    adapter?: never;
}
export interface PrismaClientOptionsWithAdapter extends PrismaClientBaseOptions {
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
}
export type PrismaClientOptions = PrismaClientOptionsWithAccelerateUrl | PrismaClientOptionsWithAdapter;
export type GlobalOmitConfig = {
    usuario?: Prisma.UsuarioOmit;
    pagina?: Prisma.PaginaOmit;
    texto?: Prisma.TextoOmit;
    vagaEmprego?: Prisma.VagaEmpregoOmit;
    vagaEstagio?: Prisma.VagaEstagioOmit;
    sala?: Prisma.SalaOmit;
    horarioAula?: Prisma.HorarioAulaOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
