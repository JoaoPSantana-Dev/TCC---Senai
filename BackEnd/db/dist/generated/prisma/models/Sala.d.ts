import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type SalaModel = runtime.Types.Result.DefaultSelection<Prisma.$SalaPayload>;
export type AggregateSala = {
    _count: SalaCountAggregateOutputType | null;
    _avg: SalaAvgAggregateOutputType | null;
    _sum: SalaSumAggregateOutputType | null;
    _min: SalaMinAggregateOutputType | null;
    _max: SalaMaxAggregateOutputType | null;
};
export type SalaAvgAggregateOutputType = {
    idSala: number | null;
};
export type SalaSumAggregateOutputType = {
    idSala: number | null;
};
export type SalaMinAggregateOutputType = {
    idSala: number | null;
    nomeSala: string | null;
    andar: string | null;
    bloco: string | null;
    imagem: string | null;
};
export type SalaMaxAggregateOutputType = {
    idSala: number | null;
    nomeSala: string | null;
    andar: string | null;
    bloco: string | null;
    imagem: string | null;
};
export type SalaCountAggregateOutputType = {
    idSala: number;
    nomeSala: number;
    andar: number;
    bloco: number;
    imagem: number;
    _all: number;
};
export type SalaAvgAggregateInputType = {
    idSala?: true;
};
export type SalaSumAggregateInputType = {
    idSala?: true;
};
export type SalaMinAggregateInputType = {
    idSala?: true;
    nomeSala?: true;
    andar?: true;
    bloco?: true;
    imagem?: true;
};
export type SalaMaxAggregateInputType = {
    idSala?: true;
    nomeSala?: true;
    andar?: true;
    bloco?: true;
    imagem?: true;
};
export type SalaCountAggregateInputType = {
    idSala?: true;
    nomeSala?: true;
    andar?: true;
    bloco?: true;
    imagem?: true;
    _all?: true;
};
export type SalaAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SalaWhereInput;
    orderBy?: Prisma.SalaOrderByWithRelationInput | Prisma.SalaOrderByWithRelationInput[];
    cursor?: Prisma.SalaWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SalaCountAggregateInputType;
    _avg?: SalaAvgAggregateInputType;
    _sum?: SalaSumAggregateInputType;
    _min?: SalaMinAggregateInputType;
    _max?: SalaMaxAggregateInputType;
};
export type GetSalaAggregateType<T extends SalaAggregateArgs> = {
    [P in keyof T & keyof AggregateSala]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSala[P]> : Prisma.GetScalarType<T[P], AggregateSala[P]>;
};
export type SalaGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SalaWhereInput;
    orderBy?: Prisma.SalaOrderByWithAggregationInput | Prisma.SalaOrderByWithAggregationInput[];
    by: Prisma.SalaScalarFieldEnum[] | Prisma.SalaScalarFieldEnum;
    having?: Prisma.SalaScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SalaCountAggregateInputType | true;
    _avg?: SalaAvgAggregateInputType;
    _sum?: SalaSumAggregateInputType;
    _min?: SalaMinAggregateInputType;
    _max?: SalaMaxAggregateInputType;
};
export type SalaGroupByOutputType = {
    idSala: number;
    nomeSala: string;
    andar: string;
    bloco: string;
    imagem: string;
    _count: SalaCountAggregateOutputType | null;
    _avg: SalaAvgAggregateOutputType | null;
    _sum: SalaSumAggregateOutputType | null;
    _min: SalaMinAggregateOutputType | null;
    _max: SalaMaxAggregateOutputType | null;
};
export type GetSalaGroupByPayload<T extends SalaGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SalaGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SalaGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SalaGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SalaGroupByOutputType[P]>;
}>>;
export type SalaWhereInput = {
    AND?: Prisma.SalaWhereInput | Prisma.SalaWhereInput[];
    OR?: Prisma.SalaWhereInput[];
    NOT?: Prisma.SalaWhereInput | Prisma.SalaWhereInput[];
    idSala?: Prisma.IntFilter<"Sala"> | number;
    nomeSala?: Prisma.StringFilter<"Sala"> | string;
    andar?: Prisma.StringFilter<"Sala"> | string;
    bloco?: Prisma.StringFilter<"Sala"> | string;
    imagem?: Prisma.StringFilter<"Sala"> | string;
    horarios?: Prisma.HorarioAulaListRelationFilter;
};
export type SalaOrderByWithRelationInput = {
    idSala?: Prisma.SortOrder;
    nomeSala?: Prisma.SortOrder;
    andar?: Prisma.SortOrder;
    bloco?: Prisma.SortOrder;
    imagem?: Prisma.SortOrder;
    horarios?: Prisma.HorarioAulaOrderByRelationAggregateInput;
    _relevance?: Prisma.SalaOrderByRelevanceInput;
};
export type SalaWhereUniqueInput = Prisma.AtLeast<{
    idSala?: number;
    AND?: Prisma.SalaWhereInput | Prisma.SalaWhereInput[];
    OR?: Prisma.SalaWhereInput[];
    NOT?: Prisma.SalaWhereInput | Prisma.SalaWhereInput[];
    nomeSala?: Prisma.StringFilter<"Sala"> | string;
    andar?: Prisma.StringFilter<"Sala"> | string;
    bloco?: Prisma.StringFilter<"Sala"> | string;
    imagem?: Prisma.StringFilter<"Sala"> | string;
    horarios?: Prisma.HorarioAulaListRelationFilter;
}, "idSala">;
export type SalaOrderByWithAggregationInput = {
    idSala?: Prisma.SortOrder;
    nomeSala?: Prisma.SortOrder;
    andar?: Prisma.SortOrder;
    bloco?: Prisma.SortOrder;
    imagem?: Prisma.SortOrder;
    _count?: Prisma.SalaCountOrderByAggregateInput;
    _avg?: Prisma.SalaAvgOrderByAggregateInput;
    _max?: Prisma.SalaMaxOrderByAggregateInput;
    _min?: Prisma.SalaMinOrderByAggregateInput;
    _sum?: Prisma.SalaSumOrderByAggregateInput;
};
export type SalaScalarWhereWithAggregatesInput = {
    AND?: Prisma.SalaScalarWhereWithAggregatesInput | Prisma.SalaScalarWhereWithAggregatesInput[];
    OR?: Prisma.SalaScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SalaScalarWhereWithAggregatesInput | Prisma.SalaScalarWhereWithAggregatesInput[];
    idSala?: Prisma.IntWithAggregatesFilter<"Sala"> | number;
    nomeSala?: Prisma.StringWithAggregatesFilter<"Sala"> | string;
    andar?: Prisma.StringWithAggregatesFilter<"Sala"> | string;
    bloco?: Prisma.StringWithAggregatesFilter<"Sala"> | string;
    imagem?: Prisma.StringWithAggregatesFilter<"Sala"> | string;
};
export type SalaCreateInput = {
    nomeSala: string;
    andar: string;
    bloco: string;
    imagem: string;
    horarios?: Prisma.HorarioAulaCreateNestedManyWithoutSalaInput;
};
export type SalaUncheckedCreateInput = {
    idSala?: number;
    nomeSala: string;
    andar: string;
    bloco: string;
    imagem: string;
    horarios?: Prisma.HorarioAulaUncheckedCreateNestedManyWithoutSalaInput;
};
export type SalaUpdateInput = {
    nomeSala?: Prisma.StringFieldUpdateOperationsInput | string;
    andar?: Prisma.StringFieldUpdateOperationsInput | string;
    bloco?: Prisma.StringFieldUpdateOperationsInput | string;
    imagem?: Prisma.StringFieldUpdateOperationsInput | string;
    horarios?: Prisma.HorarioAulaUpdateManyWithoutSalaNestedInput;
};
export type SalaUncheckedUpdateInput = {
    idSala?: Prisma.IntFieldUpdateOperationsInput | number;
    nomeSala?: Prisma.StringFieldUpdateOperationsInput | string;
    andar?: Prisma.StringFieldUpdateOperationsInput | string;
    bloco?: Prisma.StringFieldUpdateOperationsInput | string;
    imagem?: Prisma.StringFieldUpdateOperationsInput | string;
    horarios?: Prisma.HorarioAulaUncheckedUpdateManyWithoutSalaNestedInput;
};
export type SalaCreateManyInput = {
    idSala?: number;
    nomeSala: string;
    andar: string;
    bloco: string;
    imagem: string;
};
export type SalaUpdateManyMutationInput = {
    nomeSala?: Prisma.StringFieldUpdateOperationsInput | string;
    andar?: Prisma.StringFieldUpdateOperationsInput | string;
    bloco?: Prisma.StringFieldUpdateOperationsInput | string;
    imagem?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type SalaUncheckedUpdateManyInput = {
    idSala?: Prisma.IntFieldUpdateOperationsInput | number;
    nomeSala?: Prisma.StringFieldUpdateOperationsInput | string;
    andar?: Prisma.StringFieldUpdateOperationsInput | string;
    bloco?: Prisma.StringFieldUpdateOperationsInput | string;
    imagem?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type SalaOrderByRelevanceInput = {
    fields: Prisma.SalaOrderByRelevanceFieldEnum | Prisma.SalaOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type SalaCountOrderByAggregateInput = {
    idSala?: Prisma.SortOrder;
    nomeSala?: Prisma.SortOrder;
    andar?: Prisma.SortOrder;
    bloco?: Prisma.SortOrder;
    imagem?: Prisma.SortOrder;
};
export type SalaAvgOrderByAggregateInput = {
    idSala?: Prisma.SortOrder;
};
export type SalaMaxOrderByAggregateInput = {
    idSala?: Prisma.SortOrder;
    nomeSala?: Prisma.SortOrder;
    andar?: Prisma.SortOrder;
    bloco?: Prisma.SortOrder;
    imagem?: Prisma.SortOrder;
};
export type SalaMinOrderByAggregateInput = {
    idSala?: Prisma.SortOrder;
    nomeSala?: Prisma.SortOrder;
    andar?: Prisma.SortOrder;
    bloco?: Prisma.SortOrder;
    imagem?: Prisma.SortOrder;
};
export type SalaSumOrderByAggregateInput = {
    idSala?: Prisma.SortOrder;
};
export type SalaScalarRelationFilter = {
    is?: Prisma.SalaWhereInput;
    isNot?: Prisma.SalaWhereInput;
};
export type SalaCreateNestedOneWithoutHorariosInput = {
    create?: Prisma.XOR<Prisma.SalaCreateWithoutHorariosInput, Prisma.SalaUncheckedCreateWithoutHorariosInput>;
    connectOrCreate?: Prisma.SalaCreateOrConnectWithoutHorariosInput;
    connect?: Prisma.SalaWhereUniqueInput;
};
export type SalaUpdateOneRequiredWithoutHorariosNestedInput = {
    create?: Prisma.XOR<Prisma.SalaCreateWithoutHorariosInput, Prisma.SalaUncheckedCreateWithoutHorariosInput>;
    connectOrCreate?: Prisma.SalaCreateOrConnectWithoutHorariosInput;
    upsert?: Prisma.SalaUpsertWithoutHorariosInput;
    connect?: Prisma.SalaWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SalaUpdateToOneWithWhereWithoutHorariosInput, Prisma.SalaUpdateWithoutHorariosInput>, Prisma.SalaUncheckedUpdateWithoutHorariosInput>;
};
export type SalaCreateWithoutHorariosInput = {
    nomeSala: string;
    andar: string;
    bloco: string;
    imagem: string;
};
export type SalaUncheckedCreateWithoutHorariosInput = {
    idSala?: number;
    nomeSala: string;
    andar: string;
    bloco: string;
    imagem: string;
};
export type SalaCreateOrConnectWithoutHorariosInput = {
    where: Prisma.SalaWhereUniqueInput;
    create: Prisma.XOR<Prisma.SalaCreateWithoutHorariosInput, Prisma.SalaUncheckedCreateWithoutHorariosInput>;
};
export type SalaUpsertWithoutHorariosInput = {
    update: Prisma.XOR<Prisma.SalaUpdateWithoutHorariosInput, Prisma.SalaUncheckedUpdateWithoutHorariosInput>;
    create: Prisma.XOR<Prisma.SalaCreateWithoutHorariosInput, Prisma.SalaUncheckedCreateWithoutHorariosInput>;
    where?: Prisma.SalaWhereInput;
};
export type SalaUpdateToOneWithWhereWithoutHorariosInput = {
    where?: Prisma.SalaWhereInput;
    data: Prisma.XOR<Prisma.SalaUpdateWithoutHorariosInput, Prisma.SalaUncheckedUpdateWithoutHorariosInput>;
};
export type SalaUpdateWithoutHorariosInput = {
    nomeSala?: Prisma.StringFieldUpdateOperationsInput | string;
    andar?: Prisma.StringFieldUpdateOperationsInput | string;
    bloco?: Prisma.StringFieldUpdateOperationsInput | string;
    imagem?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type SalaUncheckedUpdateWithoutHorariosInput = {
    idSala?: Prisma.IntFieldUpdateOperationsInput | number;
    nomeSala?: Prisma.StringFieldUpdateOperationsInput | string;
    andar?: Prisma.StringFieldUpdateOperationsInput | string;
    bloco?: Prisma.StringFieldUpdateOperationsInput | string;
    imagem?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type SalaCountOutputType = {
    horarios: number;
};
export type SalaCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    horarios?: boolean | SalaCountOutputTypeCountHorariosArgs;
};
export type SalaCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SalaCountOutputTypeSelect<ExtArgs> | null;
};
export type SalaCountOutputTypeCountHorariosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HorarioAulaWhereInput;
};
export type SalaSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    idSala?: boolean;
    nomeSala?: boolean;
    andar?: boolean;
    bloco?: boolean;
    imagem?: boolean;
    horarios?: boolean | Prisma.Sala$horariosArgs<ExtArgs>;
    _count?: boolean | Prisma.SalaCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["sala"]>;
export type SalaSelectScalar = {
    idSala?: boolean;
    nomeSala?: boolean;
    andar?: boolean;
    bloco?: boolean;
    imagem?: boolean;
};
export type SalaOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"idSala" | "nomeSala" | "andar" | "bloco" | "imagem", ExtArgs["result"]["sala"]>;
export type SalaInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    horarios?: boolean | Prisma.Sala$horariosArgs<ExtArgs>;
    _count?: boolean | Prisma.SalaCountOutputTypeDefaultArgs<ExtArgs>;
};
export type $SalaPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Sala";
    objects: {
        horarios: Prisma.$HorarioAulaPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        idSala: number;
        nomeSala: string;
        andar: string;
        bloco: string;
        imagem: string;
    }, ExtArgs["result"]["sala"]>;
    composites: {};
};
export type SalaGetPayload<S extends boolean | null | undefined | SalaDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SalaPayload, S>;
export type SalaCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SalaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SalaCountAggregateInputType | true;
};
export interface SalaDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Sala'];
        meta: {
            name: 'Sala';
        };
    };
    findUnique<T extends SalaFindUniqueArgs>(args: Prisma.SelectSubset<T, SalaFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SalaClient<runtime.Types.Result.GetResult<Prisma.$SalaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SalaFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SalaFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SalaClient<runtime.Types.Result.GetResult<Prisma.$SalaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SalaFindFirstArgs>(args?: Prisma.SelectSubset<T, SalaFindFirstArgs<ExtArgs>>): Prisma.Prisma__SalaClient<runtime.Types.Result.GetResult<Prisma.$SalaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SalaFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SalaFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SalaClient<runtime.Types.Result.GetResult<Prisma.$SalaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SalaFindManyArgs>(args?: Prisma.SelectSubset<T, SalaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SalaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SalaCreateArgs>(args: Prisma.SelectSubset<T, SalaCreateArgs<ExtArgs>>): Prisma.Prisma__SalaClient<runtime.Types.Result.GetResult<Prisma.$SalaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SalaCreateManyArgs>(args?: Prisma.SelectSubset<T, SalaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends SalaDeleteArgs>(args: Prisma.SelectSubset<T, SalaDeleteArgs<ExtArgs>>): Prisma.Prisma__SalaClient<runtime.Types.Result.GetResult<Prisma.$SalaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SalaUpdateArgs>(args: Prisma.SelectSubset<T, SalaUpdateArgs<ExtArgs>>): Prisma.Prisma__SalaClient<runtime.Types.Result.GetResult<Prisma.$SalaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SalaDeleteManyArgs>(args?: Prisma.SelectSubset<T, SalaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SalaUpdateManyArgs>(args: Prisma.SelectSubset<T, SalaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends SalaUpsertArgs>(args: Prisma.SelectSubset<T, SalaUpsertArgs<ExtArgs>>): Prisma.Prisma__SalaClient<runtime.Types.Result.GetResult<Prisma.$SalaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SalaCountArgs>(args?: Prisma.Subset<T, SalaCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SalaCountAggregateOutputType> : number>;
    aggregate<T extends SalaAggregateArgs>(args: Prisma.Subset<T, SalaAggregateArgs>): Prisma.PrismaPromise<GetSalaAggregateType<T>>;
    groupBy<T extends SalaGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SalaGroupByArgs['orderBy'];
    } : {
        orderBy?: SalaGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SalaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSalaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SalaFieldRefs;
}
export interface Prisma__SalaClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    horarios<T extends Prisma.Sala$horariosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Sala$horariosArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HorarioAulaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SalaFieldRefs {
    readonly idSala: Prisma.FieldRef<"Sala", 'Int'>;
    readonly nomeSala: Prisma.FieldRef<"Sala", 'String'>;
    readonly andar: Prisma.FieldRef<"Sala", 'String'>;
    readonly bloco: Prisma.FieldRef<"Sala", 'String'>;
    readonly imagem: Prisma.FieldRef<"Sala", 'String'>;
}
export type SalaFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SalaSelect<ExtArgs> | null;
    omit?: Prisma.SalaOmit<ExtArgs> | null;
    include?: Prisma.SalaInclude<ExtArgs> | null;
    where: Prisma.SalaWhereUniqueInput;
};
export type SalaFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SalaSelect<ExtArgs> | null;
    omit?: Prisma.SalaOmit<ExtArgs> | null;
    include?: Prisma.SalaInclude<ExtArgs> | null;
    where: Prisma.SalaWhereUniqueInput;
};
export type SalaFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SalaSelect<ExtArgs> | null;
    omit?: Prisma.SalaOmit<ExtArgs> | null;
    include?: Prisma.SalaInclude<ExtArgs> | null;
    where?: Prisma.SalaWhereInput;
    orderBy?: Prisma.SalaOrderByWithRelationInput | Prisma.SalaOrderByWithRelationInput[];
    cursor?: Prisma.SalaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SalaScalarFieldEnum | Prisma.SalaScalarFieldEnum[];
};
export type SalaFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SalaSelect<ExtArgs> | null;
    omit?: Prisma.SalaOmit<ExtArgs> | null;
    include?: Prisma.SalaInclude<ExtArgs> | null;
    where?: Prisma.SalaWhereInput;
    orderBy?: Prisma.SalaOrderByWithRelationInput | Prisma.SalaOrderByWithRelationInput[];
    cursor?: Prisma.SalaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SalaScalarFieldEnum | Prisma.SalaScalarFieldEnum[];
};
export type SalaFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SalaSelect<ExtArgs> | null;
    omit?: Prisma.SalaOmit<ExtArgs> | null;
    include?: Prisma.SalaInclude<ExtArgs> | null;
    where?: Prisma.SalaWhereInput;
    orderBy?: Prisma.SalaOrderByWithRelationInput | Prisma.SalaOrderByWithRelationInput[];
    cursor?: Prisma.SalaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SalaScalarFieldEnum | Prisma.SalaScalarFieldEnum[];
};
export type SalaCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SalaSelect<ExtArgs> | null;
    omit?: Prisma.SalaOmit<ExtArgs> | null;
    include?: Prisma.SalaInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SalaCreateInput, Prisma.SalaUncheckedCreateInput>;
};
export type SalaCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SalaCreateManyInput | Prisma.SalaCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SalaUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SalaSelect<ExtArgs> | null;
    omit?: Prisma.SalaOmit<ExtArgs> | null;
    include?: Prisma.SalaInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SalaUpdateInput, Prisma.SalaUncheckedUpdateInput>;
    where: Prisma.SalaWhereUniqueInput;
};
export type SalaUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SalaUpdateManyMutationInput, Prisma.SalaUncheckedUpdateManyInput>;
    where?: Prisma.SalaWhereInput;
    limit?: number;
};
export type SalaUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SalaSelect<ExtArgs> | null;
    omit?: Prisma.SalaOmit<ExtArgs> | null;
    include?: Prisma.SalaInclude<ExtArgs> | null;
    where: Prisma.SalaWhereUniqueInput;
    create: Prisma.XOR<Prisma.SalaCreateInput, Prisma.SalaUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SalaUpdateInput, Prisma.SalaUncheckedUpdateInput>;
};
export type SalaDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SalaSelect<ExtArgs> | null;
    omit?: Prisma.SalaOmit<ExtArgs> | null;
    include?: Prisma.SalaInclude<ExtArgs> | null;
    where: Prisma.SalaWhereUniqueInput;
};
export type SalaDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SalaWhereInput;
    limit?: number;
};
export type Sala$horariosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HorarioAulaSelect<ExtArgs> | null;
    omit?: Prisma.HorarioAulaOmit<ExtArgs> | null;
    include?: Prisma.HorarioAulaInclude<ExtArgs> | null;
    where?: Prisma.HorarioAulaWhereInput;
    orderBy?: Prisma.HorarioAulaOrderByWithRelationInput | Prisma.HorarioAulaOrderByWithRelationInput[];
    cursor?: Prisma.HorarioAulaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.HorarioAulaScalarFieldEnum | Prisma.HorarioAulaScalarFieldEnum[];
};
export type SalaDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SalaSelect<ExtArgs> | null;
    omit?: Prisma.SalaOmit<ExtArgs> | null;
    include?: Prisma.SalaInclude<ExtArgs> | null;
};
