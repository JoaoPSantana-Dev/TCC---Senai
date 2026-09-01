import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PaginaModel = runtime.Types.Result.DefaultSelection<Prisma.$PaginaPayload>;
export type AggregatePagina = {
    _count: PaginaCountAggregateOutputType | null;
    _avg: PaginaAvgAggregateOutputType | null;
    _sum: PaginaSumAggregateOutputType | null;
    _min: PaginaMinAggregateOutputType | null;
    _max: PaginaMaxAggregateOutputType | null;
};
export type PaginaAvgAggregateOutputType = {
    idPaginas: number | null;
};
export type PaginaSumAggregateOutputType = {
    idPaginas: number | null;
};
export type PaginaMinAggregateOutputType = {
    idPaginas: number | null;
    nomePagina: string | null;
    tipoPagina: string | null;
};
export type PaginaMaxAggregateOutputType = {
    idPaginas: number | null;
    nomePagina: string | null;
    tipoPagina: string | null;
};
export type PaginaCountAggregateOutputType = {
    idPaginas: number;
    nomePagina: number;
    tipoPagina: number;
    _all: number;
};
export type PaginaAvgAggregateInputType = {
    idPaginas?: true;
};
export type PaginaSumAggregateInputType = {
    idPaginas?: true;
};
export type PaginaMinAggregateInputType = {
    idPaginas?: true;
    nomePagina?: true;
    tipoPagina?: true;
};
export type PaginaMaxAggregateInputType = {
    idPaginas?: true;
    nomePagina?: true;
    tipoPagina?: true;
};
export type PaginaCountAggregateInputType = {
    idPaginas?: true;
    nomePagina?: true;
    tipoPagina?: true;
    _all?: true;
};
export type PaginaAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaginaWhereInput;
    orderBy?: Prisma.PaginaOrderByWithRelationInput | Prisma.PaginaOrderByWithRelationInput[];
    cursor?: Prisma.PaginaWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PaginaCountAggregateInputType;
    _avg?: PaginaAvgAggregateInputType;
    _sum?: PaginaSumAggregateInputType;
    _min?: PaginaMinAggregateInputType;
    _max?: PaginaMaxAggregateInputType;
};
export type GetPaginaAggregateType<T extends PaginaAggregateArgs> = {
    [P in keyof T & keyof AggregatePagina]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePagina[P]> : Prisma.GetScalarType<T[P], AggregatePagina[P]>;
};
export type PaginaGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaginaWhereInput;
    orderBy?: Prisma.PaginaOrderByWithAggregationInput | Prisma.PaginaOrderByWithAggregationInput[];
    by: Prisma.PaginaScalarFieldEnum[] | Prisma.PaginaScalarFieldEnum;
    having?: Prisma.PaginaScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PaginaCountAggregateInputType | true;
    _avg?: PaginaAvgAggregateInputType;
    _sum?: PaginaSumAggregateInputType;
    _min?: PaginaMinAggregateInputType;
    _max?: PaginaMaxAggregateInputType;
};
export type PaginaGroupByOutputType = {
    idPaginas: number;
    nomePagina: string;
    tipoPagina: string;
    _count: PaginaCountAggregateOutputType | null;
    _avg: PaginaAvgAggregateOutputType | null;
    _sum: PaginaSumAggregateOutputType | null;
    _min: PaginaMinAggregateOutputType | null;
    _max: PaginaMaxAggregateOutputType | null;
};
export type GetPaginaGroupByPayload<T extends PaginaGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PaginaGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PaginaGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PaginaGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PaginaGroupByOutputType[P]>;
}>>;
export type PaginaWhereInput = {
    AND?: Prisma.PaginaWhereInput | Prisma.PaginaWhereInput[];
    OR?: Prisma.PaginaWhereInput[];
    NOT?: Prisma.PaginaWhereInput | Prisma.PaginaWhereInput[];
    idPaginas?: Prisma.IntFilter<"Pagina"> | number;
    nomePagina?: Prisma.StringFilter<"Pagina"> | string;
    tipoPagina?: Prisma.StringFilter<"Pagina"> | string;
    textos?: Prisma.TextoListRelationFilter;
};
export type PaginaOrderByWithRelationInput = {
    idPaginas?: Prisma.SortOrder;
    nomePagina?: Prisma.SortOrder;
    tipoPagina?: Prisma.SortOrder;
    textos?: Prisma.TextoOrderByRelationAggregateInput;
    _relevance?: Prisma.PaginaOrderByRelevanceInput;
};
export type PaginaWhereUniqueInput = Prisma.AtLeast<{
    idPaginas?: number;
    AND?: Prisma.PaginaWhereInput | Prisma.PaginaWhereInput[];
    OR?: Prisma.PaginaWhereInput[];
    NOT?: Prisma.PaginaWhereInput | Prisma.PaginaWhereInput[];
    nomePagina?: Prisma.StringFilter<"Pagina"> | string;
    tipoPagina?: Prisma.StringFilter<"Pagina"> | string;
    textos?: Prisma.TextoListRelationFilter;
}, "idPaginas">;
export type PaginaOrderByWithAggregationInput = {
    idPaginas?: Prisma.SortOrder;
    nomePagina?: Prisma.SortOrder;
    tipoPagina?: Prisma.SortOrder;
    _count?: Prisma.PaginaCountOrderByAggregateInput;
    _avg?: Prisma.PaginaAvgOrderByAggregateInput;
    _max?: Prisma.PaginaMaxOrderByAggregateInput;
    _min?: Prisma.PaginaMinOrderByAggregateInput;
    _sum?: Prisma.PaginaSumOrderByAggregateInput;
};
export type PaginaScalarWhereWithAggregatesInput = {
    AND?: Prisma.PaginaScalarWhereWithAggregatesInput | Prisma.PaginaScalarWhereWithAggregatesInput[];
    OR?: Prisma.PaginaScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PaginaScalarWhereWithAggregatesInput | Prisma.PaginaScalarWhereWithAggregatesInput[];
    idPaginas?: Prisma.IntWithAggregatesFilter<"Pagina"> | number;
    nomePagina?: Prisma.StringWithAggregatesFilter<"Pagina"> | string;
    tipoPagina?: Prisma.StringWithAggregatesFilter<"Pagina"> | string;
};
export type PaginaCreateInput = {
    nomePagina: string;
    tipoPagina: string;
    textos?: Prisma.TextoCreateNestedManyWithoutPaginaInput;
};
export type PaginaUncheckedCreateInput = {
    idPaginas?: number;
    nomePagina: string;
    tipoPagina: string;
    textos?: Prisma.TextoUncheckedCreateNestedManyWithoutPaginaInput;
};
export type PaginaUpdateInput = {
    nomePagina?: Prisma.StringFieldUpdateOperationsInput | string;
    tipoPagina?: Prisma.StringFieldUpdateOperationsInput | string;
    textos?: Prisma.TextoUpdateManyWithoutPaginaNestedInput;
};
export type PaginaUncheckedUpdateInput = {
    idPaginas?: Prisma.IntFieldUpdateOperationsInput | number;
    nomePagina?: Prisma.StringFieldUpdateOperationsInput | string;
    tipoPagina?: Prisma.StringFieldUpdateOperationsInput | string;
    textos?: Prisma.TextoUncheckedUpdateManyWithoutPaginaNestedInput;
};
export type PaginaCreateManyInput = {
    idPaginas?: number;
    nomePagina: string;
    tipoPagina: string;
};
export type PaginaUpdateManyMutationInput = {
    nomePagina?: Prisma.StringFieldUpdateOperationsInput | string;
    tipoPagina?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PaginaUncheckedUpdateManyInput = {
    idPaginas?: Prisma.IntFieldUpdateOperationsInput | number;
    nomePagina?: Prisma.StringFieldUpdateOperationsInput | string;
    tipoPagina?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PaginaOrderByRelevanceInput = {
    fields: Prisma.PaginaOrderByRelevanceFieldEnum | Prisma.PaginaOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type PaginaCountOrderByAggregateInput = {
    idPaginas?: Prisma.SortOrder;
    nomePagina?: Prisma.SortOrder;
    tipoPagina?: Prisma.SortOrder;
};
export type PaginaAvgOrderByAggregateInput = {
    idPaginas?: Prisma.SortOrder;
};
export type PaginaMaxOrderByAggregateInput = {
    idPaginas?: Prisma.SortOrder;
    nomePagina?: Prisma.SortOrder;
    tipoPagina?: Prisma.SortOrder;
};
export type PaginaMinOrderByAggregateInput = {
    idPaginas?: Prisma.SortOrder;
    nomePagina?: Prisma.SortOrder;
    tipoPagina?: Prisma.SortOrder;
};
export type PaginaSumOrderByAggregateInput = {
    idPaginas?: Prisma.SortOrder;
};
export type PaginaScalarRelationFilter = {
    is?: Prisma.PaginaWhereInput;
    isNot?: Prisma.PaginaWhereInput;
};
export type PaginaCreateNestedOneWithoutTextosInput = {
    create?: Prisma.XOR<Prisma.PaginaCreateWithoutTextosInput, Prisma.PaginaUncheckedCreateWithoutTextosInput>;
    connectOrCreate?: Prisma.PaginaCreateOrConnectWithoutTextosInput;
    connect?: Prisma.PaginaWhereUniqueInput;
};
export type PaginaUpdateOneRequiredWithoutTextosNestedInput = {
    create?: Prisma.XOR<Prisma.PaginaCreateWithoutTextosInput, Prisma.PaginaUncheckedCreateWithoutTextosInput>;
    connectOrCreate?: Prisma.PaginaCreateOrConnectWithoutTextosInput;
    upsert?: Prisma.PaginaUpsertWithoutTextosInput;
    connect?: Prisma.PaginaWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PaginaUpdateToOneWithWhereWithoutTextosInput, Prisma.PaginaUpdateWithoutTextosInput>, Prisma.PaginaUncheckedUpdateWithoutTextosInput>;
};
export type PaginaCreateWithoutTextosInput = {
    nomePagina: string;
    tipoPagina: string;
};
export type PaginaUncheckedCreateWithoutTextosInput = {
    idPaginas?: number;
    nomePagina: string;
    tipoPagina: string;
};
export type PaginaCreateOrConnectWithoutTextosInput = {
    where: Prisma.PaginaWhereUniqueInput;
    create: Prisma.XOR<Prisma.PaginaCreateWithoutTextosInput, Prisma.PaginaUncheckedCreateWithoutTextosInput>;
};
export type PaginaUpsertWithoutTextosInput = {
    update: Prisma.XOR<Prisma.PaginaUpdateWithoutTextosInput, Prisma.PaginaUncheckedUpdateWithoutTextosInput>;
    create: Prisma.XOR<Prisma.PaginaCreateWithoutTextosInput, Prisma.PaginaUncheckedCreateWithoutTextosInput>;
    where?: Prisma.PaginaWhereInput;
};
export type PaginaUpdateToOneWithWhereWithoutTextosInput = {
    where?: Prisma.PaginaWhereInput;
    data: Prisma.XOR<Prisma.PaginaUpdateWithoutTextosInput, Prisma.PaginaUncheckedUpdateWithoutTextosInput>;
};
export type PaginaUpdateWithoutTextosInput = {
    nomePagina?: Prisma.StringFieldUpdateOperationsInput | string;
    tipoPagina?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PaginaUncheckedUpdateWithoutTextosInput = {
    idPaginas?: Prisma.IntFieldUpdateOperationsInput | number;
    nomePagina?: Prisma.StringFieldUpdateOperationsInput | string;
    tipoPagina?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type PaginaCountOutputType = {
    textos: number;
};
export type PaginaCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    textos?: boolean | PaginaCountOutputTypeCountTextosArgs;
};
export type PaginaCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaginaCountOutputTypeSelect<ExtArgs> | null;
};
export type PaginaCountOutputTypeCountTextosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TextoWhereInput;
};
export type PaginaSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    idPaginas?: boolean;
    nomePagina?: boolean;
    tipoPagina?: boolean;
    textos?: boolean | Prisma.Pagina$textosArgs<ExtArgs>;
    _count?: boolean | Prisma.PaginaCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pagina"]>;
export type PaginaSelectScalar = {
    idPaginas?: boolean;
    nomePagina?: boolean;
    tipoPagina?: boolean;
};
export type PaginaOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"idPaginas" | "nomePagina" | "tipoPagina", ExtArgs["result"]["pagina"]>;
export type PaginaInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    textos?: boolean | Prisma.Pagina$textosArgs<ExtArgs>;
    _count?: boolean | Prisma.PaginaCountOutputTypeDefaultArgs<ExtArgs>;
};
export type $PaginaPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Pagina";
    objects: {
        textos: Prisma.$TextoPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        idPaginas: number;
        nomePagina: string;
        tipoPagina: string;
    }, ExtArgs["result"]["pagina"]>;
    composites: {};
};
export type PaginaGetPayload<S extends boolean | null | undefined | PaginaDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PaginaPayload, S>;
export type PaginaCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PaginaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PaginaCountAggregateInputType | true;
};
export interface PaginaDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Pagina'];
        meta: {
            name: 'Pagina';
        };
    };
    findUnique<T extends PaginaFindUniqueArgs>(args: Prisma.SelectSubset<T, PaginaFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PaginaClient<runtime.Types.Result.GetResult<Prisma.$PaginaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PaginaFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PaginaFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PaginaClient<runtime.Types.Result.GetResult<Prisma.$PaginaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PaginaFindFirstArgs>(args?: Prisma.SelectSubset<T, PaginaFindFirstArgs<ExtArgs>>): Prisma.Prisma__PaginaClient<runtime.Types.Result.GetResult<Prisma.$PaginaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PaginaFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PaginaFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PaginaClient<runtime.Types.Result.GetResult<Prisma.$PaginaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PaginaFindManyArgs>(args?: Prisma.SelectSubset<T, PaginaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PaginaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PaginaCreateArgs>(args: Prisma.SelectSubset<T, PaginaCreateArgs<ExtArgs>>): Prisma.Prisma__PaginaClient<runtime.Types.Result.GetResult<Prisma.$PaginaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PaginaCreateManyArgs>(args?: Prisma.SelectSubset<T, PaginaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends PaginaDeleteArgs>(args: Prisma.SelectSubset<T, PaginaDeleteArgs<ExtArgs>>): Prisma.Prisma__PaginaClient<runtime.Types.Result.GetResult<Prisma.$PaginaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PaginaUpdateArgs>(args: Prisma.SelectSubset<T, PaginaUpdateArgs<ExtArgs>>): Prisma.Prisma__PaginaClient<runtime.Types.Result.GetResult<Prisma.$PaginaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PaginaDeleteManyArgs>(args?: Prisma.SelectSubset<T, PaginaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PaginaUpdateManyArgs>(args: Prisma.SelectSubset<T, PaginaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends PaginaUpsertArgs>(args: Prisma.SelectSubset<T, PaginaUpsertArgs<ExtArgs>>): Prisma.Prisma__PaginaClient<runtime.Types.Result.GetResult<Prisma.$PaginaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PaginaCountArgs>(args?: Prisma.Subset<T, PaginaCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PaginaCountAggregateOutputType> : number>;
    aggregate<T extends PaginaAggregateArgs>(args: Prisma.Subset<T, PaginaAggregateArgs>): Prisma.PrismaPromise<GetPaginaAggregateType<T>>;
    groupBy<T extends PaginaGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PaginaGroupByArgs['orderBy'];
    } : {
        orderBy?: PaginaGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PaginaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaginaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PaginaFieldRefs;
}
export interface Prisma__PaginaClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    textos<T extends Prisma.Pagina$textosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Pagina$textosArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TextoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PaginaFieldRefs {
    readonly idPaginas: Prisma.FieldRef<"Pagina", 'Int'>;
    readonly nomePagina: Prisma.FieldRef<"Pagina", 'String'>;
    readonly tipoPagina: Prisma.FieldRef<"Pagina", 'String'>;
}
export type PaginaFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaginaSelect<ExtArgs> | null;
    omit?: Prisma.PaginaOmit<ExtArgs> | null;
    include?: Prisma.PaginaInclude<ExtArgs> | null;
    where: Prisma.PaginaWhereUniqueInput;
};
export type PaginaFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaginaSelect<ExtArgs> | null;
    omit?: Prisma.PaginaOmit<ExtArgs> | null;
    include?: Prisma.PaginaInclude<ExtArgs> | null;
    where: Prisma.PaginaWhereUniqueInput;
};
export type PaginaFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaginaSelect<ExtArgs> | null;
    omit?: Prisma.PaginaOmit<ExtArgs> | null;
    include?: Prisma.PaginaInclude<ExtArgs> | null;
    where?: Prisma.PaginaWhereInput;
    orderBy?: Prisma.PaginaOrderByWithRelationInput | Prisma.PaginaOrderByWithRelationInput[];
    cursor?: Prisma.PaginaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PaginaScalarFieldEnum | Prisma.PaginaScalarFieldEnum[];
};
export type PaginaFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaginaSelect<ExtArgs> | null;
    omit?: Prisma.PaginaOmit<ExtArgs> | null;
    include?: Prisma.PaginaInclude<ExtArgs> | null;
    where?: Prisma.PaginaWhereInput;
    orderBy?: Prisma.PaginaOrderByWithRelationInput | Prisma.PaginaOrderByWithRelationInput[];
    cursor?: Prisma.PaginaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PaginaScalarFieldEnum | Prisma.PaginaScalarFieldEnum[];
};
export type PaginaFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaginaSelect<ExtArgs> | null;
    omit?: Prisma.PaginaOmit<ExtArgs> | null;
    include?: Prisma.PaginaInclude<ExtArgs> | null;
    where?: Prisma.PaginaWhereInput;
    orderBy?: Prisma.PaginaOrderByWithRelationInput | Prisma.PaginaOrderByWithRelationInput[];
    cursor?: Prisma.PaginaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PaginaScalarFieldEnum | Prisma.PaginaScalarFieldEnum[];
};
export type PaginaCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaginaSelect<ExtArgs> | null;
    omit?: Prisma.PaginaOmit<ExtArgs> | null;
    include?: Prisma.PaginaInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PaginaCreateInput, Prisma.PaginaUncheckedCreateInput>;
};
export type PaginaCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PaginaCreateManyInput | Prisma.PaginaCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PaginaUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaginaSelect<ExtArgs> | null;
    omit?: Prisma.PaginaOmit<ExtArgs> | null;
    include?: Prisma.PaginaInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PaginaUpdateInput, Prisma.PaginaUncheckedUpdateInput>;
    where: Prisma.PaginaWhereUniqueInput;
};
export type PaginaUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PaginaUpdateManyMutationInput, Prisma.PaginaUncheckedUpdateManyInput>;
    where?: Prisma.PaginaWhereInput;
    limit?: number;
};
export type PaginaUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaginaSelect<ExtArgs> | null;
    omit?: Prisma.PaginaOmit<ExtArgs> | null;
    include?: Prisma.PaginaInclude<ExtArgs> | null;
    where: Prisma.PaginaWhereUniqueInput;
    create: Prisma.XOR<Prisma.PaginaCreateInput, Prisma.PaginaUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PaginaUpdateInput, Prisma.PaginaUncheckedUpdateInput>;
};
export type PaginaDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaginaSelect<ExtArgs> | null;
    omit?: Prisma.PaginaOmit<ExtArgs> | null;
    include?: Prisma.PaginaInclude<ExtArgs> | null;
    where: Prisma.PaginaWhereUniqueInput;
};
export type PaginaDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaginaWhereInput;
    limit?: number;
};
export type Pagina$textosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TextoSelect<ExtArgs> | null;
    omit?: Prisma.TextoOmit<ExtArgs> | null;
    include?: Prisma.TextoInclude<ExtArgs> | null;
    where?: Prisma.TextoWhereInput;
    orderBy?: Prisma.TextoOrderByWithRelationInput | Prisma.TextoOrderByWithRelationInput[];
    cursor?: Prisma.TextoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TextoScalarFieldEnum | Prisma.TextoScalarFieldEnum[];
};
export type PaginaDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PaginaSelect<ExtArgs> | null;
    omit?: Prisma.PaginaOmit<ExtArgs> | null;
    include?: Prisma.PaginaInclude<ExtArgs> | null;
};
