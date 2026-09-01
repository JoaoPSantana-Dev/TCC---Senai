import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type TextoModel = runtime.Types.Result.DefaultSelection<Prisma.$TextoPayload>;
export type AggregateTexto = {
    _count: TextoCountAggregateOutputType | null;
    _avg: TextoAvgAggregateOutputType | null;
    _sum: TextoSumAggregateOutputType | null;
    _min: TextoMinAggregateOutputType | null;
    _max: TextoMaxAggregateOutputType | null;
};
export type TextoAvgAggregateOutputType = {
    idTextos: number | null;
    idPagina: number | null;
};
export type TextoSumAggregateOutputType = {
    idTextos: number | null;
    idPagina: number | null;
};
export type TextoMinAggregateOutputType = {
    idTextos: number | null;
    texto: string | null;
    tipoTexto: string | null;
    idPagina: number | null;
};
export type TextoMaxAggregateOutputType = {
    idTextos: number | null;
    texto: string | null;
    tipoTexto: string | null;
    idPagina: number | null;
};
export type TextoCountAggregateOutputType = {
    idTextos: number;
    texto: number;
    tipoTexto: number;
    idPagina: number;
    _all: number;
};
export type TextoAvgAggregateInputType = {
    idTextos?: true;
    idPagina?: true;
};
export type TextoSumAggregateInputType = {
    idTextos?: true;
    idPagina?: true;
};
export type TextoMinAggregateInputType = {
    idTextos?: true;
    texto?: true;
    tipoTexto?: true;
    idPagina?: true;
};
export type TextoMaxAggregateInputType = {
    idTextos?: true;
    texto?: true;
    tipoTexto?: true;
    idPagina?: true;
};
export type TextoCountAggregateInputType = {
    idTextos?: true;
    texto?: true;
    tipoTexto?: true;
    idPagina?: true;
    _all?: true;
};
export type TextoAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TextoWhereInput;
    orderBy?: Prisma.TextoOrderByWithRelationInput | Prisma.TextoOrderByWithRelationInput[];
    cursor?: Prisma.TextoWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TextoCountAggregateInputType;
    _avg?: TextoAvgAggregateInputType;
    _sum?: TextoSumAggregateInputType;
    _min?: TextoMinAggregateInputType;
    _max?: TextoMaxAggregateInputType;
};
export type GetTextoAggregateType<T extends TextoAggregateArgs> = {
    [P in keyof T & keyof AggregateTexto]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTexto[P]> : Prisma.GetScalarType<T[P], AggregateTexto[P]>;
};
export type TextoGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TextoWhereInput;
    orderBy?: Prisma.TextoOrderByWithAggregationInput | Prisma.TextoOrderByWithAggregationInput[];
    by: Prisma.TextoScalarFieldEnum[] | Prisma.TextoScalarFieldEnum;
    having?: Prisma.TextoScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TextoCountAggregateInputType | true;
    _avg?: TextoAvgAggregateInputType;
    _sum?: TextoSumAggregateInputType;
    _min?: TextoMinAggregateInputType;
    _max?: TextoMaxAggregateInputType;
};
export type TextoGroupByOutputType = {
    idTextos: number;
    texto: string;
    tipoTexto: string;
    idPagina: number;
    _count: TextoCountAggregateOutputType | null;
    _avg: TextoAvgAggregateOutputType | null;
    _sum: TextoSumAggregateOutputType | null;
    _min: TextoMinAggregateOutputType | null;
    _max: TextoMaxAggregateOutputType | null;
};
export type GetTextoGroupByPayload<T extends TextoGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TextoGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TextoGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TextoGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TextoGroupByOutputType[P]>;
}>>;
export type TextoWhereInput = {
    AND?: Prisma.TextoWhereInput | Prisma.TextoWhereInput[];
    OR?: Prisma.TextoWhereInput[];
    NOT?: Prisma.TextoWhereInput | Prisma.TextoWhereInput[];
    idTextos?: Prisma.IntFilter<"Texto"> | number;
    texto?: Prisma.StringFilter<"Texto"> | string;
    tipoTexto?: Prisma.StringFilter<"Texto"> | string;
    idPagina?: Prisma.IntFilter<"Texto"> | number;
    pagina?: Prisma.XOR<Prisma.PaginaScalarRelationFilter, Prisma.PaginaWhereInput>;
};
export type TextoOrderByWithRelationInput = {
    idTextos?: Prisma.SortOrder;
    texto?: Prisma.SortOrder;
    tipoTexto?: Prisma.SortOrder;
    idPagina?: Prisma.SortOrder;
    pagina?: Prisma.PaginaOrderByWithRelationInput;
    _relevance?: Prisma.TextoOrderByRelevanceInput;
};
export type TextoWhereUniqueInput = Prisma.AtLeast<{
    idTextos?: number;
    AND?: Prisma.TextoWhereInput | Prisma.TextoWhereInput[];
    OR?: Prisma.TextoWhereInput[];
    NOT?: Prisma.TextoWhereInput | Prisma.TextoWhereInput[];
    texto?: Prisma.StringFilter<"Texto"> | string;
    tipoTexto?: Prisma.StringFilter<"Texto"> | string;
    idPagina?: Prisma.IntFilter<"Texto"> | number;
    pagina?: Prisma.XOR<Prisma.PaginaScalarRelationFilter, Prisma.PaginaWhereInput>;
}, "idTextos">;
export type TextoOrderByWithAggregationInput = {
    idTextos?: Prisma.SortOrder;
    texto?: Prisma.SortOrder;
    tipoTexto?: Prisma.SortOrder;
    idPagina?: Prisma.SortOrder;
    _count?: Prisma.TextoCountOrderByAggregateInput;
    _avg?: Prisma.TextoAvgOrderByAggregateInput;
    _max?: Prisma.TextoMaxOrderByAggregateInput;
    _min?: Prisma.TextoMinOrderByAggregateInput;
    _sum?: Prisma.TextoSumOrderByAggregateInput;
};
export type TextoScalarWhereWithAggregatesInput = {
    AND?: Prisma.TextoScalarWhereWithAggregatesInput | Prisma.TextoScalarWhereWithAggregatesInput[];
    OR?: Prisma.TextoScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TextoScalarWhereWithAggregatesInput | Prisma.TextoScalarWhereWithAggregatesInput[];
    idTextos?: Prisma.IntWithAggregatesFilter<"Texto"> | number;
    texto?: Prisma.StringWithAggregatesFilter<"Texto"> | string;
    tipoTexto?: Prisma.StringWithAggregatesFilter<"Texto"> | string;
    idPagina?: Prisma.IntWithAggregatesFilter<"Texto"> | number;
};
export type TextoCreateInput = {
    texto: string;
    tipoTexto: string;
    pagina: Prisma.PaginaCreateNestedOneWithoutTextosInput;
};
export type TextoUncheckedCreateInput = {
    idTextos?: number;
    texto: string;
    tipoTexto: string;
    idPagina: number;
};
export type TextoUpdateInput = {
    texto?: Prisma.StringFieldUpdateOperationsInput | string;
    tipoTexto?: Prisma.StringFieldUpdateOperationsInput | string;
    pagina?: Prisma.PaginaUpdateOneRequiredWithoutTextosNestedInput;
};
export type TextoUncheckedUpdateInput = {
    idTextos?: Prisma.IntFieldUpdateOperationsInput | number;
    texto?: Prisma.StringFieldUpdateOperationsInput | string;
    tipoTexto?: Prisma.StringFieldUpdateOperationsInput | string;
    idPagina?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type TextoCreateManyInput = {
    idTextos?: number;
    texto: string;
    tipoTexto: string;
    idPagina: number;
};
export type TextoUpdateManyMutationInput = {
    texto?: Prisma.StringFieldUpdateOperationsInput | string;
    tipoTexto?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type TextoUncheckedUpdateManyInput = {
    idTextos?: Prisma.IntFieldUpdateOperationsInput | number;
    texto?: Prisma.StringFieldUpdateOperationsInput | string;
    tipoTexto?: Prisma.StringFieldUpdateOperationsInput | string;
    idPagina?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type TextoListRelationFilter = {
    every?: Prisma.TextoWhereInput;
    some?: Prisma.TextoWhereInput;
    none?: Prisma.TextoWhereInput;
};
export type TextoOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type TextoOrderByRelevanceInput = {
    fields: Prisma.TextoOrderByRelevanceFieldEnum | Prisma.TextoOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type TextoCountOrderByAggregateInput = {
    idTextos?: Prisma.SortOrder;
    texto?: Prisma.SortOrder;
    tipoTexto?: Prisma.SortOrder;
    idPagina?: Prisma.SortOrder;
};
export type TextoAvgOrderByAggregateInput = {
    idTextos?: Prisma.SortOrder;
    idPagina?: Prisma.SortOrder;
};
export type TextoMaxOrderByAggregateInput = {
    idTextos?: Prisma.SortOrder;
    texto?: Prisma.SortOrder;
    tipoTexto?: Prisma.SortOrder;
    idPagina?: Prisma.SortOrder;
};
export type TextoMinOrderByAggregateInput = {
    idTextos?: Prisma.SortOrder;
    texto?: Prisma.SortOrder;
    tipoTexto?: Prisma.SortOrder;
    idPagina?: Prisma.SortOrder;
};
export type TextoSumOrderByAggregateInput = {
    idTextos?: Prisma.SortOrder;
    idPagina?: Prisma.SortOrder;
};
export type TextoCreateNestedManyWithoutPaginaInput = {
    create?: Prisma.XOR<Prisma.TextoCreateWithoutPaginaInput, Prisma.TextoUncheckedCreateWithoutPaginaInput> | Prisma.TextoCreateWithoutPaginaInput[] | Prisma.TextoUncheckedCreateWithoutPaginaInput[];
    connectOrCreate?: Prisma.TextoCreateOrConnectWithoutPaginaInput | Prisma.TextoCreateOrConnectWithoutPaginaInput[];
    createMany?: Prisma.TextoCreateManyPaginaInputEnvelope;
    connect?: Prisma.TextoWhereUniqueInput | Prisma.TextoWhereUniqueInput[];
};
export type TextoUncheckedCreateNestedManyWithoutPaginaInput = {
    create?: Prisma.XOR<Prisma.TextoCreateWithoutPaginaInput, Prisma.TextoUncheckedCreateWithoutPaginaInput> | Prisma.TextoCreateWithoutPaginaInput[] | Prisma.TextoUncheckedCreateWithoutPaginaInput[];
    connectOrCreate?: Prisma.TextoCreateOrConnectWithoutPaginaInput | Prisma.TextoCreateOrConnectWithoutPaginaInput[];
    createMany?: Prisma.TextoCreateManyPaginaInputEnvelope;
    connect?: Prisma.TextoWhereUniqueInput | Prisma.TextoWhereUniqueInput[];
};
export type TextoUpdateManyWithoutPaginaNestedInput = {
    create?: Prisma.XOR<Prisma.TextoCreateWithoutPaginaInput, Prisma.TextoUncheckedCreateWithoutPaginaInput> | Prisma.TextoCreateWithoutPaginaInput[] | Prisma.TextoUncheckedCreateWithoutPaginaInput[];
    connectOrCreate?: Prisma.TextoCreateOrConnectWithoutPaginaInput | Prisma.TextoCreateOrConnectWithoutPaginaInput[];
    upsert?: Prisma.TextoUpsertWithWhereUniqueWithoutPaginaInput | Prisma.TextoUpsertWithWhereUniqueWithoutPaginaInput[];
    createMany?: Prisma.TextoCreateManyPaginaInputEnvelope;
    set?: Prisma.TextoWhereUniqueInput | Prisma.TextoWhereUniqueInput[];
    disconnect?: Prisma.TextoWhereUniqueInput | Prisma.TextoWhereUniqueInput[];
    delete?: Prisma.TextoWhereUniqueInput | Prisma.TextoWhereUniqueInput[];
    connect?: Prisma.TextoWhereUniqueInput | Prisma.TextoWhereUniqueInput[];
    update?: Prisma.TextoUpdateWithWhereUniqueWithoutPaginaInput | Prisma.TextoUpdateWithWhereUniqueWithoutPaginaInput[];
    updateMany?: Prisma.TextoUpdateManyWithWhereWithoutPaginaInput | Prisma.TextoUpdateManyWithWhereWithoutPaginaInput[];
    deleteMany?: Prisma.TextoScalarWhereInput | Prisma.TextoScalarWhereInput[];
};
export type TextoUncheckedUpdateManyWithoutPaginaNestedInput = {
    create?: Prisma.XOR<Prisma.TextoCreateWithoutPaginaInput, Prisma.TextoUncheckedCreateWithoutPaginaInput> | Prisma.TextoCreateWithoutPaginaInput[] | Prisma.TextoUncheckedCreateWithoutPaginaInput[];
    connectOrCreate?: Prisma.TextoCreateOrConnectWithoutPaginaInput | Prisma.TextoCreateOrConnectWithoutPaginaInput[];
    upsert?: Prisma.TextoUpsertWithWhereUniqueWithoutPaginaInput | Prisma.TextoUpsertWithWhereUniqueWithoutPaginaInput[];
    createMany?: Prisma.TextoCreateManyPaginaInputEnvelope;
    set?: Prisma.TextoWhereUniqueInput | Prisma.TextoWhereUniqueInput[];
    disconnect?: Prisma.TextoWhereUniqueInput | Prisma.TextoWhereUniqueInput[];
    delete?: Prisma.TextoWhereUniqueInput | Prisma.TextoWhereUniqueInput[];
    connect?: Prisma.TextoWhereUniqueInput | Prisma.TextoWhereUniqueInput[];
    update?: Prisma.TextoUpdateWithWhereUniqueWithoutPaginaInput | Prisma.TextoUpdateWithWhereUniqueWithoutPaginaInput[];
    updateMany?: Prisma.TextoUpdateManyWithWhereWithoutPaginaInput | Prisma.TextoUpdateManyWithWhereWithoutPaginaInput[];
    deleteMany?: Prisma.TextoScalarWhereInput | Prisma.TextoScalarWhereInput[];
};
export type TextoCreateWithoutPaginaInput = {
    texto: string;
    tipoTexto: string;
};
export type TextoUncheckedCreateWithoutPaginaInput = {
    idTextos?: number;
    texto: string;
    tipoTexto: string;
};
export type TextoCreateOrConnectWithoutPaginaInput = {
    where: Prisma.TextoWhereUniqueInput;
    create: Prisma.XOR<Prisma.TextoCreateWithoutPaginaInput, Prisma.TextoUncheckedCreateWithoutPaginaInput>;
};
export type TextoCreateManyPaginaInputEnvelope = {
    data: Prisma.TextoCreateManyPaginaInput | Prisma.TextoCreateManyPaginaInput[];
    skipDuplicates?: boolean;
};
export type TextoUpsertWithWhereUniqueWithoutPaginaInput = {
    where: Prisma.TextoWhereUniqueInput;
    update: Prisma.XOR<Prisma.TextoUpdateWithoutPaginaInput, Prisma.TextoUncheckedUpdateWithoutPaginaInput>;
    create: Prisma.XOR<Prisma.TextoCreateWithoutPaginaInput, Prisma.TextoUncheckedCreateWithoutPaginaInput>;
};
export type TextoUpdateWithWhereUniqueWithoutPaginaInput = {
    where: Prisma.TextoWhereUniqueInput;
    data: Prisma.XOR<Prisma.TextoUpdateWithoutPaginaInput, Prisma.TextoUncheckedUpdateWithoutPaginaInput>;
};
export type TextoUpdateManyWithWhereWithoutPaginaInput = {
    where: Prisma.TextoScalarWhereInput;
    data: Prisma.XOR<Prisma.TextoUpdateManyMutationInput, Prisma.TextoUncheckedUpdateManyWithoutPaginaInput>;
};
export type TextoScalarWhereInput = {
    AND?: Prisma.TextoScalarWhereInput | Prisma.TextoScalarWhereInput[];
    OR?: Prisma.TextoScalarWhereInput[];
    NOT?: Prisma.TextoScalarWhereInput | Prisma.TextoScalarWhereInput[];
    idTextos?: Prisma.IntFilter<"Texto"> | number;
    texto?: Prisma.StringFilter<"Texto"> | string;
    tipoTexto?: Prisma.StringFilter<"Texto"> | string;
    idPagina?: Prisma.IntFilter<"Texto"> | number;
};
export type TextoCreateManyPaginaInput = {
    idTextos?: number;
    texto: string;
    tipoTexto: string;
};
export type TextoUpdateWithoutPaginaInput = {
    texto?: Prisma.StringFieldUpdateOperationsInput | string;
    tipoTexto?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type TextoUncheckedUpdateWithoutPaginaInput = {
    idTextos?: Prisma.IntFieldUpdateOperationsInput | number;
    texto?: Prisma.StringFieldUpdateOperationsInput | string;
    tipoTexto?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type TextoUncheckedUpdateManyWithoutPaginaInput = {
    idTextos?: Prisma.IntFieldUpdateOperationsInput | number;
    texto?: Prisma.StringFieldUpdateOperationsInput | string;
    tipoTexto?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type TextoSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    idTextos?: boolean;
    texto?: boolean;
    tipoTexto?: boolean;
    idPagina?: boolean;
    pagina?: boolean | Prisma.PaginaDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["texto"]>;
export type TextoSelectScalar = {
    idTextos?: boolean;
    texto?: boolean;
    tipoTexto?: boolean;
    idPagina?: boolean;
};
export type TextoOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"idTextos" | "texto" | "tipoTexto" | "idPagina", ExtArgs["result"]["texto"]>;
export type TextoInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    pagina?: boolean | Prisma.PaginaDefaultArgs<ExtArgs>;
};
export type $TextoPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Texto";
    objects: {
        pagina: Prisma.$PaginaPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        idTextos: number;
        texto: string;
        tipoTexto: string;
        idPagina: number;
    }, ExtArgs["result"]["texto"]>;
    composites: {};
};
export type TextoGetPayload<S extends boolean | null | undefined | TextoDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TextoPayload, S>;
export type TextoCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TextoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TextoCountAggregateInputType | true;
};
export interface TextoDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Texto'];
        meta: {
            name: 'Texto';
        };
    };
    findUnique<T extends TextoFindUniqueArgs>(args: Prisma.SelectSubset<T, TextoFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TextoClient<runtime.Types.Result.GetResult<Prisma.$TextoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TextoFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TextoFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TextoClient<runtime.Types.Result.GetResult<Prisma.$TextoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TextoFindFirstArgs>(args?: Prisma.SelectSubset<T, TextoFindFirstArgs<ExtArgs>>): Prisma.Prisma__TextoClient<runtime.Types.Result.GetResult<Prisma.$TextoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TextoFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TextoFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TextoClient<runtime.Types.Result.GetResult<Prisma.$TextoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TextoFindManyArgs>(args?: Prisma.SelectSubset<T, TextoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TextoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TextoCreateArgs>(args: Prisma.SelectSubset<T, TextoCreateArgs<ExtArgs>>): Prisma.Prisma__TextoClient<runtime.Types.Result.GetResult<Prisma.$TextoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TextoCreateManyArgs>(args?: Prisma.SelectSubset<T, TextoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends TextoDeleteArgs>(args: Prisma.SelectSubset<T, TextoDeleteArgs<ExtArgs>>): Prisma.Prisma__TextoClient<runtime.Types.Result.GetResult<Prisma.$TextoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TextoUpdateArgs>(args: Prisma.SelectSubset<T, TextoUpdateArgs<ExtArgs>>): Prisma.Prisma__TextoClient<runtime.Types.Result.GetResult<Prisma.$TextoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TextoDeleteManyArgs>(args?: Prisma.SelectSubset<T, TextoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TextoUpdateManyArgs>(args: Prisma.SelectSubset<T, TextoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends TextoUpsertArgs>(args: Prisma.SelectSubset<T, TextoUpsertArgs<ExtArgs>>): Prisma.Prisma__TextoClient<runtime.Types.Result.GetResult<Prisma.$TextoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TextoCountArgs>(args?: Prisma.Subset<T, TextoCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TextoCountAggregateOutputType> : number>;
    aggregate<T extends TextoAggregateArgs>(args: Prisma.Subset<T, TextoAggregateArgs>): Prisma.PrismaPromise<GetTextoAggregateType<T>>;
    groupBy<T extends TextoGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TextoGroupByArgs['orderBy'];
    } : {
        orderBy?: TextoGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TextoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTextoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TextoFieldRefs;
}
export interface Prisma__TextoClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    pagina<T extends Prisma.PaginaDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PaginaDefaultArgs<ExtArgs>>): Prisma.Prisma__PaginaClient<runtime.Types.Result.GetResult<Prisma.$PaginaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TextoFieldRefs {
    readonly idTextos: Prisma.FieldRef<"Texto", 'Int'>;
    readonly texto: Prisma.FieldRef<"Texto", 'String'>;
    readonly tipoTexto: Prisma.FieldRef<"Texto", 'String'>;
    readonly idPagina: Prisma.FieldRef<"Texto", 'Int'>;
}
export type TextoFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TextoSelect<ExtArgs> | null;
    omit?: Prisma.TextoOmit<ExtArgs> | null;
    include?: Prisma.TextoInclude<ExtArgs> | null;
    where: Prisma.TextoWhereUniqueInput;
};
export type TextoFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TextoSelect<ExtArgs> | null;
    omit?: Prisma.TextoOmit<ExtArgs> | null;
    include?: Prisma.TextoInclude<ExtArgs> | null;
    where: Prisma.TextoWhereUniqueInput;
};
export type TextoFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TextoFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TextoFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type TextoCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TextoSelect<ExtArgs> | null;
    omit?: Prisma.TextoOmit<ExtArgs> | null;
    include?: Prisma.TextoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TextoCreateInput, Prisma.TextoUncheckedCreateInput>;
};
export type TextoCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TextoCreateManyInput | Prisma.TextoCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TextoUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TextoSelect<ExtArgs> | null;
    omit?: Prisma.TextoOmit<ExtArgs> | null;
    include?: Prisma.TextoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TextoUpdateInput, Prisma.TextoUncheckedUpdateInput>;
    where: Prisma.TextoWhereUniqueInput;
};
export type TextoUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TextoUpdateManyMutationInput, Prisma.TextoUncheckedUpdateManyInput>;
    where?: Prisma.TextoWhereInput;
    limit?: number;
};
export type TextoUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TextoSelect<ExtArgs> | null;
    omit?: Prisma.TextoOmit<ExtArgs> | null;
    include?: Prisma.TextoInclude<ExtArgs> | null;
    where: Prisma.TextoWhereUniqueInput;
    create: Prisma.XOR<Prisma.TextoCreateInput, Prisma.TextoUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TextoUpdateInput, Prisma.TextoUncheckedUpdateInput>;
};
export type TextoDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TextoSelect<ExtArgs> | null;
    omit?: Prisma.TextoOmit<ExtArgs> | null;
    include?: Prisma.TextoInclude<ExtArgs> | null;
    where: Prisma.TextoWhereUniqueInput;
};
export type TextoDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TextoWhereInput;
    limit?: number;
};
export type TextoDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TextoSelect<ExtArgs> | null;
    omit?: Prisma.TextoOmit<ExtArgs> | null;
    include?: Prisma.TextoInclude<ExtArgs> | null;
};
