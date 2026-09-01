import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type VagaEstagioModel = runtime.Types.Result.DefaultSelection<Prisma.$VagaEstagioPayload>;
export type AggregateVagaEstagio = {
    _count: VagaEstagioCountAggregateOutputType | null;
    _avg: VagaEstagioAvgAggregateOutputType | null;
    _sum: VagaEstagioSumAggregateOutputType | null;
    _min: VagaEstagioMinAggregateOutputType | null;
    _max: VagaEstagioMaxAggregateOutputType | null;
};
export type VagaEstagioAvgAggregateOutputType = {
    idEstagio: number | null;
};
export type VagaEstagioSumAggregateOutputType = {
    idEstagio: number | null;
};
export type VagaEstagioMinAggregateOutputType = {
    idEstagio: number | null;
    nomeEmpresa: string | null;
    cargo: string | null;
    requisitos: string | null;
    salario: string | null;
    beneficios: string | null;
    descricao: string | null;
    localizacao: string | null;
    contato: string | null;
    areaEstagio: string | null;
};
export type VagaEstagioMaxAggregateOutputType = {
    idEstagio: number | null;
    nomeEmpresa: string | null;
    cargo: string | null;
    requisitos: string | null;
    salario: string | null;
    beneficios: string | null;
    descricao: string | null;
    localizacao: string | null;
    contato: string | null;
    areaEstagio: string | null;
};
export type VagaEstagioCountAggregateOutputType = {
    idEstagio: number;
    nomeEmpresa: number;
    cargo: number;
    requisitos: number;
    salario: number;
    beneficios: number;
    descricao: number;
    localizacao: number;
    contato: number;
    areaEstagio: number;
    _all: number;
};
export type VagaEstagioAvgAggregateInputType = {
    idEstagio?: true;
};
export type VagaEstagioSumAggregateInputType = {
    idEstagio?: true;
};
export type VagaEstagioMinAggregateInputType = {
    idEstagio?: true;
    nomeEmpresa?: true;
    cargo?: true;
    requisitos?: true;
    salario?: true;
    beneficios?: true;
    descricao?: true;
    localizacao?: true;
    contato?: true;
    areaEstagio?: true;
};
export type VagaEstagioMaxAggregateInputType = {
    idEstagio?: true;
    nomeEmpresa?: true;
    cargo?: true;
    requisitos?: true;
    salario?: true;
    beneficios?: true;
    descricao?: true;
    localizacao?: true;
    contato?: true;
    areaEstagio?: true;
};
export type VagaEstagioCountAggregateInputType = {
    idEstagio?: true;
    nomeEmpresa?: true;
    cargo?: true;
    requisitos?: true;
    salario?: true;
    beneficios?: true;
    descricao?: true;
    localizacao?: true;
    contato?: true;
    areaEstagio?: true;
    _all?: true;
};
export type VagaEstagioAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VagaEstagioWhereInput;
    orderBy?: Prisma.VagaEstagioOrderByWithRelationInput | Prisma.VagaEstagioOrderByWithRelationInput[];
    cursor?: Prisma.VagaEstagioWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | VagaEstagioCountAggregateInputType;
    _avg?: VagaEstagioAvgAggregateInputType;
    _sum?: VagaEstagioSumAggregateInputType;
    _min?: VagaEstagioMinAggregateInputType;
    _max?: VagaEstagioMaxAggregateInputType;
};
export type GetVagaEstagioAggregateType<T extends VagaEstagioAggregateArgs> = {
    [P in keyof T & keyof AggregateVagaEstagio]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateVagaEstagio[P]> : Prisma.GetScalarType<T[P], AggregateVagaEstagio[P]>;
};
export type VagaEstagioGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VagaEstagioWhereInput;
    orderBy?: Prisma.VagaEstagioOrderByWithAggregationInput | Prisma.VagaEstagioOrderByWithAggregationInput[];
    by: Prisma.VagaEstagioScalarFieldEnum[] | Prisma.VagaEstagioScalarFieldEnum;
    having?: Prisma.VagaEstagioScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: VagaEstagioCountAggregateInputType | true;
    _avg?: VagaEstagioAvgAggregateInputType;
    _sum?: VagaEstagioSumAggregateInputType;
    _min?: VagaEstagioMinAggregateInputType;
    _max?: VagaEstagioMaxAggregateInputType;
};
export type VagaEstagioGroupByOutputType = {
    idEstagio: number;
    nomeEmpresa: string;
    cargo: string;
    requisitos: string;
    salario: string;
    beneficios: string;
    descricao: string;
    localizacao: string;
    contato: string;
    areaEstagio: string;
    _count: VagaEstagioCountAggregateOutputType | null;
    _avg: VagaEstagioAvgAggregateOutputType | null;
    _sum: VagaEstagioSumAggregateOutputType | null;
    _min: VagaEstagioMinAggregateOutputType | null;
    _max: VagaEstagioMaxAggregateOutputType | null;
};
export type GetVagaEstagioGroupByPayload<T extends VagaEstagioGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<VagaEstagioGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof VagaEstagioGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], VagaEstagioGroupByOutputType[P]> : Prisma.GetScalarType<T[P], VagaEstagioGroupByOutputType[P]>;
}>>;
export type VagaEstagioWhereInput = {
    AND?: Prisma.VagaEstagioWhereInput | Prisma.VagaEstagioWhereInput[];
    OR?: Prisma.VagaEstagioWhereInput[];
    NOT?: Prisma.VagaEstagioWhereInput | Prisma.VagaEstagioWhereInput[];
    idEstagio?: Prisma.IntFilter<"VagaEstagio"> | number;
    nomeEmpresa?: Prisma.StringFilter<"VagaEstagio"> | string;
    cargo?: Prisma.StringFilter<"VagaEstagio"> | string;
    requisitos?: Prisma.StringFilter<"VagaEstagio"> | string;
    salario?: Prisma.StringFilter<"VagaEstagio"> | string;
    beneficios?: Prisma.StringFilter<"VagaEstagio"> | string;
    descricao?: Prisma.StringFilter<"VagaEstagio"> | string;
    localizacao?: Prisma.StringFilter<"VagaEstagio"> | string;
    contato?: Prisma.StringFilter<"VagaEstagio"> | string;
    areaEstagio?: Prisma.StringFilter<"VagaEstagio"> | string;
};
export type VagaEstagioOrderByWithRelationInput = {
    idEstagio?: Prisma.SortOrder;
    nomeEmpresa?: Prisma.SortOrder;
    cargo?: Prisma.SortOrder;
    requisitos?: Prisma.SortOrder;
    salario?: Prisma.SortOrder;
    beneficios?: Prisma.SortOrder;
    descricao?: Prisma.SortOrder;
    localizacao?: Prisma.SortOrder;
    contato?: Prisma.SortOrder;
    areaEstagio?: Prisma.SortOrder;
    _relevance?: Prisma.VagaEstagioOrderByRelevanceInput;
};
export type VagaEstagioWhereUniqueInput = Prisma.AtLeast<{
    idEstagio?: number;
    AND?: Prisma.VagaEstagioWhereInput | Prisma.VagaEstagioWhereInput[];
    OR?: Prisma.VagaEstagioWhereInput[];
    NOT?: Prisma.VagaEstagioWhereInput | Prisma.VagaEstagioWhereInput[];
    nomeEmpresa?: Prisma.StringFilter<"VagaEstagio"> | string;
    cargo?: Prisma.StringFilter<"VagaEstagio"> | string;
    requisitos?: Prisma.StringFilter<"VagaEstagio"> | string;
    salario?: Prisma.StringFilter<"VagaEstagio"> | string;
    beneficios?: Prisma.StringFilter<"VagaEstagio"> | string;
    descricao?: Prisma.StringFilter<"VagaEstagio"> | string;
    localizacao?: Prisma.StringFilter<"VagaEstagio"> | string;
    contato?: Prisma.StringFilter<"VagaEstagio"> | string;
    areaEstagio?: Prisma.StringFilter<"VagaEstagio"> | string;
}, "idEstagio">;
export type VagaEstagioOrderByWithAggregationInput = {
    idEstagio?: Prisma.SortOrder;
    nomeEmpresa?: Prisma.SortOrder;
    cargo?: Prisma.SortOrder;
    requisitos?: Prisma.SortOrder;
    salario?: Prisma.SortOrder;
    beneficios?: Prisma.SortOrder;
    descricao?: Prisma.SortOrder;
    localizacao?: Prisma.SortOrder;
    contato?: Prisma.SortOrder;
    areaEstagio?: Prisma.SortOrder;
    _count?: Prisma.VagaEstagioCountOrderByAggregateInput;
    _avg?: Prisma.VagaEstagioAvgOrderByAggregateInput;
    _max?: Prisma.VagaEstagioMaxOrderByAggregateInput;
    _min?: Prisma.VagaEstagioMinOrderByAggregateInput;
    _sum?: Prisma.VagaEstagioSumOrderByAggregateInput;
};
export type VagaEstagioScalarWhereWithAggregatesInput = {
    AND?: Prisma.VagaEstagioScalarWhereWithAggregatesInput | Prisma.VagaEstagioScalarWhereWithAggregatesInput[];
    OR?: Prisma.VagaEstagioScalarWhereWithAggregatesInput[];
    NOT?: Prisma.VagaEstagioScalarWhereWithAggregatesInput | Prisma.VagaEstagioScalarWhereWithAggregatesInput[];
    idEstagio?: Prisma.IntWithAggregatesFilter<"VagaEstagio"> | number;
    nomeEmpresa?: Prisma.StringWithAggregatesFilter<"VagaEstagio"> | string;
    cargo?: Prisma.StringWithAggregatesFilter<"VagaEstagio"> | string;
    requisitos?: Prisma.StringWithAggregatesFilter<"VagaEstagio"> | string;
    salario?: Prisma.StringWithAggregatesFilter<"VagaEstagio"> | string;
    beneficios?: Prisma.StringWithAggregatesFilter<"VagaEstagio"> | string;
    descricao?: Prisma.StringWithAggregatesFilter<"VagaEstagio"> | string;
    localizacao?: Prisma.StringWithAggregatesFilter<"VagaEstagio"> | string;
    contato?: Prisma.StringWithAggregatesFilter<"VagaEstagio"> | string;
    areaEstagio?: Prisma.StringWithAggregatesFilter<"VagaEstagio"> | string;
};
export type VagaEstagioCreateInput = {
    nomeEmpresa: string;
    cargo: string;
    requisitos: string;
    salario: string;
    beneficios: string;
    descricao: string;
    localizacao: string;
    contato: string;
    areaEstagio: string;
};
export type VagaEstagioUncheckedCreateInput = {
    idEstagio?: number;
    nomeEmpresa: string;
    cargo: string;
    requisitos: string;
    salario: string;
    beneficios: string;
    descricao: string;
    localizacao: string;
    contato: string;
    areaEstagio: string;
};
export type VagaEstagioUpdateInput = {
    nomeEmpresa?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.StringFieldUpdateOperationsInput | string;
    requisitos?: Prisma.StringFieldUpdateOperationsInput | string;
    salario?: Prisma.StringFieldUpdateOperationsInput | string;
    beneficios?: Prisma.StringFieldUpdateOperationsInput | string;
    descricao?: Prisma.StringFieldUpdateOperationsInput | string;
    localizacao?: Prisma.StringFieldUpdateOperationsInput | string;
    contato?: Prisma.StringFieldUpdateOperationsInput | string;
    areaEstagio?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type VagaEstagioUncheckedUpdateInput = {
    idEstagio?: Prisma.IntFieldUpdateOperationsInput | number;
    nomeEmpresa?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.StringFieldUpdateOperationsInput | string;
    requisitos?: Prisma.StringFieldUpdateOperationsInput | string;
    salario?: Prisma.StringFieldUpdateOperationsInput | string;
    beneficios?: Prisma.StringFieldUpdateOperationsInput | string;
    descricao?: Prisma.StringFieldUpdateOperationsInput | string;
    localizacao?: Prisma.StringFieldUpdateOperationsInput | string;
    contato?: Prisma.StringFieldUpdateOperationsInput | string;
    areaEstagio?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type VagaEstagioCreateManyInput = {
    idEstagio?: number;
    nomeEmpresa: string;
    cargo: string;
    requisitos: string;
    salario: string;
    beneficios: string;
    descricao: string;
    localizacao: string;
    contato: string;
    areaEstagio: string;
};
export type VagaEstagioUpdateManyMutationInput = {
    nomeEmpresa?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.StringFieldUpdateOperationsInput | string;
    requisitos?: Prisma.StringFieldUpdateOperationsInput | string;
    salario?: Prisma.StringFieldUpdateOperationsInput | string;
    beneficios?: Prisma.StringFieldUpdateOperationsInput | string;
    descricao?: Prisma.StringFieldUpdateOperationsInput | string;
    localizacao?: Prisma.StringFieldUpdateOperationsInput | string;
    contato?: Prisma.StringFieldUpdateOperationsInput | string;
    areaEstagio?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type VagaEstagioUncheckedUpdateManyInput = {
    idEstagio?: Prisma.IntFieldUpdateOperationsInput | number;
    nomeEmpresa?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.StringFieldUpdateOperationsInput | string;
    requisitos?: Prisma.StringFieldUpdateOperationsInput | string;
    salario?: Prisma.StringFieldUpdateOperationsInput | string;
    beneficios?: Prisma.StringFieldUpdateOperationsInput | string;
    descricao?: Prisma.StringFieldUpdateOperationsInput | string;
    localizacao?: Prisma.StringFieldUpdateOperationsInput | string;
    contato?: Prisma.StringFieldUpdateOperationsInput | string;
    areaEstagio?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type VagaEstagioOrderByRelevanceInput = {
    fields: Prisma.VagaEstagioOrderByRelevanceFieldEnum | Prisma.VagaEstagioOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type VagaEstagioCountOrderByAggregateInput = {
    idEstagio?: Prisma.SortOrder;
    nomeEmpresa?: Prisma.SortOrder;
    cargo?: Prisma.SortOrder;
    requisitos?: Prisma.SortOrder;
    salario?: Prisma.SortOrder;
    beneficios?: Prisma.SortOrder;
    descricao?: Prisma.SortOrder;
    localizacao?: Prisma.SortOrder;
    contato?: Prisma.SortOrder;
    areaEstagio?: Prisma.SortOrder;
};
export type VagaEstagioAvgOrderByAggregateInput = {
    idEstagio?: Prisma.SortOrder;
};
export type VagaEstagioMaxOrderByAggregateInput = {
    idEstagio?: Prisma.SortOrder;
    nomeEmpresa?: Prisma.SortOrder;
    cargo?: Prisma.SortOrder;
    requisitos?: Prisma.SortOrder;
    salario?: Prisma.SortOrder;
    beneficios?: Prisma.SortOrder;
    descricao?: Prisma.SortOrder;
    localizacao?: Prisma.SortOrder;
    contato?: Prisma.SortOrder;
    areaEstagio?: Prisma.SortOrder;
};
export type VagaEstagioMinOrderByAggregateInput = {
    idEstagio?: Prisma.SortOrder;
    nomeEmpresa?: Prisma.SortOrder;
    cargo?: Prisma.SortOrder;
    requisitos?: Prisma.SortOrder;
    salario?: Prisma.SortOrder;
    beneficios?: Prisma.SortOrder;
    descricao?: Prisma.SortOrder;
    localizacao?: Prisma.SortOrder;
    contato?: Prisma.SortOrder;
    areaEstagio?: Prisma.SortOrder;
};
export type VagaEstagioSumOrderByAggregateInput = {
    idEstagio?: Prisma.SortOrder;
};
export type VagaEstagioSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    idEstagio?: boolean;
    nomeEmpresa?: boolean;
    cargo?: boolean;
    requisitos?: boolean;
    salario?: boolean;
    beneficios?: boolean;
    descricao?: boolean;
    localizacao?: boolean;
    contato?: boolean;
    areaEstagio?: boolean;
}, ExtArgs["result"]["vagaEstagio"]>;
export type VagaEstagioSelectScalar = {
    idEstagio?: boolean;
    nomeEmpresa?: boolean;
    cargo?: boolean;
    requisitos?: boolean;
    salario?: boolean;
    beneficios?: boolean;
    descricao?: boolean;
    localizacao?: boolean;
    contato?: boolean;
    areaEstagio?: boolean;
};
export type VagaEstagioOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"idEstagio" | "nomeEmpresa" | "cargo" | "requisitos" | "salario" | "beneficios" | "descricao" | "localizacao" | "contato" | "areaEstagio", ExtArgs["result"]["vagaEstagio"]>;
export type $VagaEstagioPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "VagaEstagio";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        idEstagio: number;
        nomeEmpresa: string;
        cargo: string;
        requisitos: string;
        salario: string;
        beneficios: string;
        descricao: string;
        localizacao: string;
        contato: string;
        areaEstagio: string;
    }, ExtArgs["result"]["vagaEstagio"]>;
    composites: {};
};
export type VagaEstagioGetPayload<S extends boolean | null | undefined | VagaEstagioDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$VagaEstagioPayload, S>;
export type VagaEstagioCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<VagaEstagioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: VagaEstagioCountAggregateInputType | true;
};
export interface VagaEstagioDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['VagaEstagio'];
        meta: {
            name: 'VagaEstagio';
        };
    };
    findUnique<T extends VagaEstagioFindUniqueArgs>(args: Prisma.SelectSubset<T, VagaEstagioFindUniqueArgs<ExtArgs>>): Prisma.Prisma__VagaEstagioClient<runtime.Types.Result.GetResult<Prisma.$VagaEstagioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends VagaEstagioFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, VagaEstagioFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__VagaEstagioClient<runtime.Types.Result.GetResult<Prisma.$VagaEstagioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends VagaEstagioFindFirstArgs>(args?: Prisma.SelectSubset<T, VagaEstagioFindFirstArgs<ExtArgs>>): Prisma.Prisma__VagaEstagioClient<runtime.Types.Result.GetResult<Prisma.$VagaEstagioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends VagaEstagioFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, VagaEstagioFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__VagaEstagioClient<runtime.Types.Result.GetResult<Prisma.$VagaEstagioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends VagaEstagioFindManyArgs>(args?: Prisma.SelectSubset<T, VagaEstagioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VagaEstagioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends VagaEstagioCreateArgs>(args: Prisma.SelectSubset<T, VagaEstagioCreateArgs<ExtArgs>>): Prisma.Prisma__VagaEstagioClient<runtime.Types.Result.GetResult<Prisma.$VagaEstagioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends VagaEstagioCreateManyArgs>(args?: Prisma.SelectSubset<T, VagaEstagioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends VagaEstagioDeleteArgs>(args: Prisma.SelectSubset<T, VagaEstagioDeleteArgs<ExtArgs>>): Prisma.Prisma__VagaEstagioClient<runtime.Types.Result.GetResult<Prisma.$VagaEstagioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends VagaEstagioUpdateArgs>(args: Prisma.SelectSubset<T, VagaEstagioUpdateArgs<ExtArgs>>): Prisma.Prisma__VagaEstagioClient<runtime.Types.Result.GetResult<Prisma.$VagaEstagioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends VagaEstagioDeleteManyArgs>(args?: Prisma.SelectSubset<T, VagaEstagioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends VagaEstagioUpdateManyArgs>(args: Prisma.SelectSubset<T, VagaEstagioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends VagaEstagioUpsertArgs>(args: Prisma.SelectSubset<T, VagaEstagioUpsertArgs<ExtArgs>>): Prisma.Prisma__VagaEstagioClient<runtime.Types.Result.GetResult<Prisma.$VagaEstagioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends VagaEstagioCountArgs>(args?: Prisma.Subset<T, VagaEstagioCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], VagaEstagioCountAggregateOutputType> : number>;
    aggregate<T extends VagaEstagioAggregateArgs>(args: Prisma.Subset<T, VagaEstagioAggregateArgs>): Prisma.PrismaPromise<GetVagaEstagioAggregateType<T>>;
    groupBy<T extends VagaEstagioGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: VagaEstagioGroupByArgs['orderBy'];
    } : {
        orderBy?: VagaEstagioGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, VagaEstagioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVagaEstagioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: VagaEstagioFieldRefs;
}
export interface Prisma__VagaEstagioClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface VagaEstagioFieldRefs {
    readonly idEstagio: Prisma.FieldRef<"VagaEstagio", 'Int'>;
    readonly nomeEmpresa: Prisma.FieldRef<"VagaEstagio", 'String'>;
    readonly cargo: Prisma.FieldRef<"VagaEstagio", 'String'>;
    readonly requisitos: Prisma.FieldRef<"VagaEstagio", 'String'>;
    readonly salario: Prisma.FieldRef<"VagaEstagio", 'String'>;
    readonly beneficios: Prisma.FieldRef<"VagaEstagio", 'String'>;
    readonly descricao: Prisma.FieldRef<"VagaEstagio", 'String'>;
    readonly localizacao: Prisma.FieldRef<"VagaEstagio", 'String'>;
    readonly contato: Prisma.FieldRef<"VagaEstagio", 'String'>;
    readonly areaEstagio: Prisma.FieldRef<"VagaEstagio", 'String'>;
}
export type VagaEstagioFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VagaEstagioSelect<ExtArgs> | null;
    omit?: Prisma.VagaEstagioOmit<ExtArgs> | null;
    where: Prisma.VagaEstagioWhereUniqueInput;
};
export type VagaEstagioFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VagaEstagioSelect<ExtArgs> | null;
    omit?: Prisma.VagaEstagioOmit<ExtArgs> | null;
    where: Prisma.VagaEstagioWhereUniqueInput;
};
export type VagaEstagioFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VagaEstagioSelect<ExtArgs> | null;
    omit?: Prisma.VagaEstagioOmit<ExtArgs> | null;
    where?: Prisma.VagaEstagioWhereInput;
    orderBy?: Prisma.VagaEstagioOrderByWithRelationInput | Prisma.VagaEstagioOrderByWithRelationInput[];
    cursor?: Prisma.VagaEstagioWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VagaEstagioScalarFieldEnum | Prisma.VagaEstagioScalarFieldEnum[];
};
export type VagaEstagioFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VagaEstagioSelect<ExtArgs> | null;
    omit?: Prisma.VagaEstagioOmit<ExtArgs> | null;
    where?: Prisma.VagaEstagioWhereInput;
    orderBy?: Prisma.VagaEstagioOrderByWithRelationInput | Prisma.VagaEstagioOrderByWithRelationInput[];
    cursor?: Prisma.VagaEstagioWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VagaEstagioScalarFieldEnum | Prisma.VagaEstagioScalarFieldEnum[];
};
export type VagaEstagioFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VagaEstagioSelect<ExtArgs> | null;
    omit?: Prisma.VagaEstagioOmit<ExtArgs> | null;
    where?: Prisma.VagaEstagioWhereInput;
    orderBy?: Prisma.VagaEstagioOrderByWithRelationInput | Prisma.VagaEstagioOrderByWithRelationInput[];
    cursor?: Prisma.VagaEstagioWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VagaEstagioScalarFieldEnum | Prisma.VagaEstagioScalarFieldEnum[];
};
export type VagaEstagioCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VagaEstagioSelect<ExtArgs> | null;
    omit?: Prisma.VagaEstagioOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VagaEstagioCreateInput, Prisma.VagaEstagioUncheckedCreateInput>;
};
export type VagaEstagioCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.VagaEstagioCreateManyInput | Prisma.VagaEstagioCreateManyInput[];
    skipDuplicates?: boolean;
};
export type VagaEstagioUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VagaEstagioSelect<ExtArgs> | null;
    omit?: Prisma.VagaEstagioOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VagaEstagioUpdateInput, Prisma.VagaEstagioUncheckedUpdateInput>;
    where: Prisma.VagaEstagioWhereUniqueInput;
};
export type VagaEstagioUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.VagaEstagioUpdateManyMutationInput, Prisma.VagaEstagioUncheckedUpdateManyInput>;
    where?: Prisma.VagaEstagioWhereInput;
    limit?: number;
};
export type VagaEstagioUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VagaEstagioSelect<ExtArgs> | null;
    omit?: Prisma.VagaEstagioOmit<ExtArgs> | null;
    where: Prisma.VagaEstagioWhereUniqueInput;
    create: Prisma.XOR<Prisma.VagaEstagioCreateInput, Prisma.VagaEstagioUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.VagaEstagioUpdateInput, Prisma.VagaEstagioUncheckedUpdateInput>;
};
export type VagaEstagioDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VagaEstagioSelect<ExtArgs> | null;
    omit?: Prisma.VagaEstagioOmit<ExtArgs> | null;
    where: Prisma.VagaEstagioWhereUniqueInput;
};
export type VagaEstagioDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VagaEstagioWhereInput;
    limit?: number;
};
export type VagaEstagioDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VagaEstagioSelect<ExtArgs> | null;
    omit?: Prisma.VagaEstagioOmit<ExtArgs> | null;
};
