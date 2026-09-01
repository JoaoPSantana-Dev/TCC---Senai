import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type VagaEmpregoModel = runtime.Types.Result.DefaultSelection<Prisma.$VagaEmpregoPayload>;
export type AggregateVagaEmprego = {
    _count: VagaEmpregoCountAggregateOutputType | null;
    _avg: VagaEmpregoAvgAggregateOutputType | null;
    _sum: VagaEmpregoSumAggregateOutputType | null;
    _min: VagaEmpregoMinAggregateOutputType | null;
    _max: VagaEmpregoMaxAggregateOutputType | null;
};
export type VagaEmpregoAvgAggregateOutputType = {
    idEmprego: number | null;
};
export type VagaEmpregoSumAggregateOutputType = {
    idEmprego: number | null;
};
export type VagaEmpregoMinAggregateOutputType = {
    idEmprego: number | null;
    nomeEmpresa: string | null;
    cargo: string | null;
    requisitos: string | null;
    salario: string | null;
    beneficios: string | null;
    descricao: string | null;
    localizacao: string | null;
    contato: string | null;
    areaEmprego: string | null;
};
export type VagaEmpregoMaxAggregateOutputType = {
    idEmprego: number | null;
    nomeEmpresa: string | null;
    cargo: string | null;
    requisitos: string | null;
    salario: string | null;
    beneficios: string | null;
    descricao: string | null;
    localizacao: string | null;
    contato: string | null;
    areaEmprego: string | null;
};
export type VagaEmpregoCountAggregateOutputType = {
    idEmprego: number;
    nomeEmpresa: number;
    cargo: number;
    requisitos: number;
    salario: number;
    beneficios: number;
    descricao: number;
    localizacao: number;
    contato: number;
    areaEmprego: number;
    _all: number;
};
export type VagaEmpregoAvgAggregateInputType = {
    idEmprego?: true;
};
export type VagaEmpregoSumAggregateInputType = {
    idEmprego?: true;
};
export type VagaEmpregoMinAggregateInputType = {
    idEmprego?: true;
    nomeEmpresa?: true;
    cargo?: true;
    requisitos?: true;
    salario?: true;
    beneficios?: true;
    descricao?: true;
    localizacao?: true;
    contato?: true;
    areaEmprego?: true;
};
export type VagaEmpregoMaxAggregateInputType = {
    idEmprego?: true;
    nomeEmpresa?: true;
    cargo?: true;
    requisitos?: true;
    salario?: true;
    beneficios?: true;
    descricao?: true;
    localizacao?: true;
    contato?: true;
    areaEmprego?: true;
};
export type VagaEmpregoCountAggregateInputType = {
    idEmprego?: true;
    nomeEmpresa?: true;
    cargo?: true;
    requisitos?: true;
    salario?: true;
    beneficios?: true;
    descricao?: true;
    localizacao?: true;
    contato?: true;
    areaEmprego?: true;
    _all?: true;
};
export type VagaEmpregoAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VagaEmpregoWhereInput;
    orderBy?: Prisma.VagaEmpregoOrderByWithRelationInput | Prisma.VagaEmpregoOrderByWithRelationInput[];
    cursor?: Prisma.VagaEmpregoWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | VagaEmpregoCountAggregateInputType;
    _avg?: VagaEmpregoAvgAggregateInputType;
    _sum?: VagaEmpregoSumAggregateInputType;
    _min?: VagaEmpregoMinAggregateInputType;
    _max?: VagaEmpregoMaxAggregateInputType;
};
export type GetVagaEmpregoAggregateType<T extends VagaEmpregoAggregateArgs> = {
    [P in keyof T & keyof AggregateVagaEmprego]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateVagaEmprego[P]> : Prisma.GetScalarType<T[P], AggregateVagaEmprego[P]>;
};
export type VagaEmpregoGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VagaEmpregoWhereInput;
    orderBy?: Prisma.VagaEmpregoOrderByWithAggregationInput | Prisma.VagaEmpregoOrderByWithAggregationInput[];
    by: Prisma.VagaEmpregoScalarFieldEnum[] | Prisma.VagaEmpregoScalarFieldEnum;
    having?: Prisma.VagaEmpregoScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: VagaEmpregoCountAggregateInputType | true;
    _avg?: VagaEmpregoAvgAggregateInputType;
    _sum?: VagaEmpregoSumAggregateInputType;
    _min?: VagaEmpregoMinAggregateInputType;
    _max?: VagaEmpregoMaxAggregateInputType;
};
export type VagaEmpregoGroupByOutputType = {
    idEmprego: number;
    nomeEmpresa: string;
    cargo: string;
    requisitos: string;
    salario: string;
    beneficios: string;
    descricao: string;
    localizacao: string;
    contato: string;
    areaEmprego: string;
    _count: VagaEmpregoCountAggregateOutputType | null;
    _avg: VagaEmpregoAvgAggregateOutputType | null;
    _sum: VagaEmpregoSumAggregateOutputType | null;
    _min: VagaEmpregoMinAggregateOutputType | null;
    _max: VagaEmpregoMaxAggregateOutputType | null;
};
export type GetVagaEmpregoGroupByPayload<T extends VagaEmpregoGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<VagaEmpregoGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof VagaEmpregoGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], VagaEmpregoGroupByOutputType[P]> : Prisma.GetScalarType<T[P], VagaEmpregoGroupByOutputType[P]>;
}>>;
export type VagaEmpregoWhereInput = {
    AND?: Prisma.VagaEmpregoWhereInput | Prisma.VagaEmpregoWhereInput[];
    OR?: Prisma.VagaEmpregoWhereInput[];
    NOT?: Prisma.VagaEmpregoWhereInput | Prisma.VagaEmpregoWhereInput[];
    idEmprego?: Prisma.IntFilter<"VagaEmprego"> | number;
    nomeEmpresa?: Prisma.StringFilter<"VagaEmprego"> | string;
    cargo?: Prisma.StringFilter<"VagaEmprego"> | string;
    requisitos?: Prisma.StringFilter<"VagaEmprego"> | string;
    salario?: Prisma.StringFilter<"VagaEmprego"> | string;
    beneficios?: Prisma.StringFilter<"VagaEmprego"> | string;
    descricao?: Prisma.StringFilter<"VagaEmprego"> | string;
    localizacao?: Prisma.StringFilter<"VagaEmprego"> | string;
    contato?: Prisma.StringFilter<"VagaEmprego"> | string;
    areaEmprego?: Prisma.StringFilter<"VagaEmprego"> | string;
};
export type VagaEmpregoOrderByWithRelationInput = {
    idEmprego?: Prisma.SortOrder;
    nomeEmpresa?: Prisma.SortOrder;
    cargo?: Prisma.SortOrder;
    requisitos?: Prisma.SortOrder;
    salario?: Prisma.SortOrder;
    beneficios?: Prisma.SortOrder;
    descricao?: Prisma.SortOrder;
    localizacao?: Prisma.SortOrder;
    contato?: Prisma.SortOrder;
    areaEmprego?: Prisma.SortOrder;
    _relevance?: Prisma.VagaEmpregoOrderByRelevanceInput;
};
export type VagaEmpregoWhereUniqueInput = Prisma.AtLeast<{
    idEmprego?: number;
    AND?: Prisma.VagaEmpregoWhereInput | Prisma.VagaEmpregoWhereInput[];
    OR?: Prisma.VagaEmpregoWhereInput[];
    NOT?: Prisma.VagaEmpregoWhereInput | Prisma.VagaEmpregoWhereInput[];
    nomeEmpresa?: Prisma.StringFilter<"VagaEmprego"> | string;
    cargo?: Prisma.StringFilter<"VagaEmprego"> | string;
    requisitos?: Prisma.StringFilter<"VagaEmprego"> | string;
    salario?: Prisma.StringFilter<"VagaEmprego"> | string;
    beneficios?: Prisma.StringFilter<"VagaEmprego"> | string;
    descricao?: Prisma.StringFilter<"VagaEmprego"> | string;
    localizacao?: Prisma.StringFilter<"VagaEmprego"> | string;
    contato?: Prisma.StringFilter<"VagaEmprego"> | string;
    areaEmprego?: Prisma.StringFilter<"VagaEmprego"> | string;
}, "idEmprego">;
export type VagaEmpregoOrderByWithAggregationInput = {
    idEmprego?: Prisma.SortOrder;
    nomeEmpresa?: Prisma.SortOrder;
    cargo?: Prisma.SortOrder;
    requisitos?: Prisma.SortOrder;
    salario?: Prisma.SortOrder;
    beneficios?: Prisma.SortOrder;
    descricao?: Prisma.SortOrder;
    localizacao?: Prisma.SortOrder;
    contato?: Prisma.SortOrder;
    areaEmprego?: Prisma.SortOrder;
    _count?: Prisma.VagaEmpregoCountOrderByAggregateInput;
    _avg?: Prisma.VagaEmpregoAvgOrderByAggregateInput;
    _max?: Prisma.VagaEmpregoMaxOrderByAggregateInput;
    _min?: Prisma.VagaEmpregoMinOrderByAggregateInput;
    _sum?: Prisma.VagaEmpregoSumOrderByAggregateInput;
};
export type VagaEmpregoScalarWhereWithAggregatesInput = {
    AND?: Prisma.VagaEmpregoScalarWhereWithAggregatesInput | Prisma.VagaEmpregoScalarWhereWithAggregatesInput[];
    OR?: Prisma.VagaEmpregoScalarWhereWithAggregatesInput[];
    NOT?: Prisma.VagaEmpregoScalarWhereWithAggregatesInput | Prisma.VagaEmpregoScalarWhereWithAggregatesInput[];
    idEmprego?: Prisma.IntWithAggregatesFilter<"VagaEmprego"> | number;
    nomeEmpresa?: Prisma.StringWithAggregatesFilter<"VagaEmprego"> | string;
    cargo?: Prisma.StringWithAggregatesFilter<"VagaEmprego"> | string;
    requisitos?: Prisma.StringWithAggregatesFilter<"VagaEmprego"> | string;
    salario?: Prisma.StringWithAggregatesFilter<"VagaEmprego"> | string;
    beneficios?: Prisma.StringWithAggregatesFilter<"VagaEmprego"> | string;
    descricao?: Prisma.StringWithAggregatesFilter<"VagaEmprego"> | string;
    localizacao?: Prisma.StringWithAggregatesFilter<"VagaEmprego"> | string;
    contato?: Prisma.StringWithAggregatesFilter<"VagaEmprego"> | string;
    areaEmprego?: Prisma.StringWithAggregatesFilter<"VagaEmprego"> | string;
};
export type VagaEmpregoCreateInput = {
    nomeEmpresa: string;
    cargo: string;
    requisitos: string;
    salario: string;
    beneficios: string;
    descricao: string;
    localizacao: string;
    contato: string;
    areaEmprego: string;
};
export type VagaEmpregoUncheckedCreateInput = {
    idEmprego?: number;
    nomeEmpresa: string;
    cargo: string;
    requisitos: string;
    salario: string;
    beneficios: string;
    descricao: string;
    localizacao: string;
    contato: string;
    areaEmprego: string;
};
export type VagaEmpregoUpdateInput = {
    nomeEmpresa?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.StringFieldUpdateOperationsInput | string;
    requisitos?: Prisma.StringFieldUpdateOperationsInput | string;
    salario?: Prisma.StringFieldUpdateOperationsInput | string;
    beneficios?: Prisma.StringFieldUpdateOperationsInput | string;
    descricao?: Prisma.StringFieldUpdateOperationsInput | string;
    localizacao?: Prisma.StringFieldUpdateOperationsInput | string;
    contato?: Prisma.StringFieldUpdateOperationsInput | string;
    areaEmprego?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type VagaEmpregoUncheckedUpdateInput = {
    idEmprego?: Prisma.IntFieldUpdateOperationsInput | number;
    nomeEmpresa?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.StringFieldUpdateOperationsInput | string;
    requisitos?: Prisma.StringFieldUpdateOperationsInput | string;
    salario?: Prisma.StringFieldUpdateOperationsInput | string;
    beneficios?: Prisma.StringFieldUpdateOperationsInput | string;
    descricao?: Prisma.StringFieldUpdateOperationsInput | string;
    localizacao?: Prisma.StringFieldUpdateOperationsInput | string;
    contato?: Prisma.StringFieldUpdateOperationsInput | string;
    areaEmprego?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type VagaEmpregoCreateManyInput = {
    idEmprego?: number;
    nomeEmpresa: string;
    cargo: string;
    requisitos: string;
    salario: string;
    beneficios: string;
    descricao: string;
    localizacao: string;
    contato: string;
    areaEmprego: string;
};
export type VagaEmpregoUpdateManyMutationInput = {
    nomeEmpresa?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.StringFieldUpdateOperationsInput | string;
    requisitos?: Prisma.StringFieldUpdateOperationsInput | string;
    salario?: Prisma.StringFieldUpdateOperationsInput | string;
    beneficios?: Prisma.StringFieldUpdateOperationsInput | string;
    descricao?: Prisma.StringFieldUpdateOperationsInput | string;
    localizacao?: Prisma.StringFieldUpdateOperationsInput | string;
    contato?: Prisma.StringFieldUpdateOperationsInput | string;
    areaEmprego?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type VagaEmpregoUncheckedUpdateManyInput = {
    idEmprego?: Prisma.IntFieldUpdateOperationsInput | number;
    nomeEmpresa?: Prisma.StringFieldUpdateOperationsInput | string;
    cargo?: Prisma.StringFieldUpdateOperationsInput | string;
    requisitos?: Prisma.StringFieldUpdateOperationsInput | string;
    salario?: Prisma.StringFieldUpdateOperationsInput | string;
    beneficios?: Prisma.StringFieldUpdateOperationsInput | string;
    descricao?: Prisma.StringFieldUpdateOperationsInput | string;
    localizacao?: Prisma.StringFieldUpdateOperationsInput | string;
    contato?: Prisma.StringFieldUpdateOperationsInput | string;
    areaEmprego?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type VagaEmpregoOrderByRelevanceInput = {
    fields: Prisma.VagaEmpregoOrderByRelevanceFieldEnum | Prisma.VagaEmpregoOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type VagaEmpregoCountOrderByAggregateInput = {
    idEmprego?: Prisma.SortOrder;
    nomeEmpresa?: Prisma.SortOrder;
    cargo?: Prisma.SortOrder;
    requisitos?: Prisma.SortOrder;
    salario?: Prisma.SortOrder;
    beneficios?: Prisma.SortOrder;
    descricao?: Prisma.SortOrder;
    localizacao?: Prisma.SortOrder;
    contato?: Prisma.SortOrder;
    areaEmprego?: Prisma.SortOrder;
};
export type VagaEmpregoAvgOrderByAggregateInput = {
    idEmprego?: Prisma.SortOrder;
};
export type VagaEmpregoMaxOrderByAggregateInput = {
    idEmprego?: Prisma.SortOrder;
    nomeEmpresa?: Prisma.SortOrder;
    cargo?: Prisma.SortOrder;
    requisitos?: Prisma.SortOrder;
    salario?: Prisma.SortOrder;
    beneficios?: Prisma.SortOrder;
    descricao?: Prisma.SortOrder;
    localizacao?: Prisma.SortOrder;
    contato?: Prisma.SortOrder;
    areaEmprego?: Prisma.SortOrder;
};
export type VagaEmpregoMinOrderByAggregateInput = {
    idEmprego?: Prisma.SortOrder;
    nomeEmpresa?: Prisma.SortOrder;
    cargo?: Prisma.SortOrder;
    requisitos?: Prisma.SortOrder;
    salario?: Prisma.SortOrder;
    beneficios?: Prisma.SortOrder;
    descricao?: Prisma.SortOrder;
    localizacao?: Prisma.SortOrder;
    contato?: Prisma.SortOrder;
    areaEmprego?: Prisma.SortOrder;
};
export type VagaEmpregoSumOrderByAggregateInput = {
    idEmprego?: Prisma.SortOrder;
};
export type VagaEmpregoSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    idEmprego?: boolean;
    nomeEmpresa?: boolean;
    cargo?: boolean;
    requisitos?: boolean;
    salario?: boolean;
    beneficios?: boolean;
    descricao?: boolean;
    localizacao?: boolean;
    contato?: boolean;
    areaEmprego?: boolean;
}, ExtArgs["result"]["vagaEmprego"]>;
export type VagaEmpregoSelectScalar = {
    idEmprego?: boolean;
    nomeEmpresa?: boolean;
    cargo?: boolean;
    requisitos?: boolean;
    salario?: boolean;
    beneficios?: boolean;
    descricao?: boolean;
    localizacao?: boolean;
    contato?: boolean;
    areaEmprego?: boolean;
};
export type VagaEmpregoOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"idEmprego" | "nomeEmpresa" | "cargo" | "requisitos" | "salario" | "beneficios" | "descricao" | "localizacao" | "contato" | "areaEmprego", ExtArgs["result"]["vagaEmprego"]>;
export type $VagaEmpregoPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "VagaEmprego";
    objects: {};
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        idEmprego: number;
        nomeEmpresa: string;
        cargo: string;
        requisitos: string;
        salario: string;
        beneficios: string;
        descricao: string;
        localizacao: string;
        contato: string;
        areaEmprego: string;
    }, ExtArgs["result"]["vagaEmprego"]>;
    composites: {};
};
export type VagaEmpregoGetPayload<S extends boolean | null | undefined | VagaEmpregoDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$VagaEmpregoPayload, S>;
export type VagaEmpregoCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<VagaEmpregoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: VagaEmpregoCountAggregateInputType | true;
};
export interface VagaEmpregoDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['VagaEmprego'];
        meta: {
            name: 'VagaEmprego';
        };
    };
    findUnique<T extends VagaEmpregoFindUniqueArgs>(args: Prisma.SelectSubset<T, VagaEmpregoFindUniqueArgs<ExtArgs>>): Prisma.Prisma__VagaEmpregoClient<runtime.Types.Result.GetResult<Prisma.$VagaEmpregoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends VagaEmpregoFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, VagaEmpregoFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__VagaEmpregoClient<runtime.Types.Result.GetResult<Prisma.$VagaEmpregoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends VagaEmpregoFindFirstArgs>(args?: Prisma.SelectSubset<T, VagaEmpregoFindFirstArgs<ExtArgs>>): Prisma.Prisma__VagaEmpregoClient<runtime.Types.Result.GetResult<Prisma.$VagaEmpregoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends VagaEmpregoFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, VagaEmpregoFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__VagaEmpregoClient<runtime.Types.Result.GetResult<Prisma.$VagaEmpregoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends VagaEmpregoFindManyArgs>(args?: Prisma.SelectSubset<T, VagaEmpregoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VagaEmpregoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends VagaEmpregoCreateArgs>(args: Prisma.SelectSubset<T, VagaEmpregoCreateArgs<ExtArgs>>): Prisma.Prisma__VagaEmpregoClient<runtime.Types.Result.GetResult<Prisma.$VagaEmpregoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends VagaEmpregoCreateManyArgs>(args?: Prisma.SelectSubset<T, VagaEmpregoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends VagaEmpregoDeleteArgs>(args: Prisma.SelectSubset<T, VagaEmpregoDeleteArgs<ExtArgs>>): Prisma.Prisma__VagaEmpregoClient<runtime.Types.Result.GetResult<Prisma.$VagaEmpregoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends VagaEmpregoUpdateArgs>(args: Prisma.SelectSubset<T, VagaEmpregoUpdateArgs<ExtArgs>>): Prisma.Prisma__VagaEmpregoClient<runtime.Types.Result.GetResult<Prisma.$VagaEmpregoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends VagaEmpregoDeleteManyArgs>(args?: Prisma.SelectSubset<T, VagaEmpregoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends VagaEmpregoUpdateManyArgs>(args: Prisma.SelectSubset<T, VagaEmpregoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends VagaEmpregoUpsertArgs>(args: Prisma.SelectSubset<T, VagaEmpregoUpsertArgs<ExtArgs>>): Prisma.Prisma__VagaEmpregoClient<runtime.Types.Result.GetResult<Prisma.$VagaEmpregoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends VagaEmpregoCountArgs>(args?: Prisma.Subset<T, VagaEmpregoCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], VagaEmpregoCountAggregateOutputType> : number>;
    aggregate<T extends VagaEmpregoAggregateArgs>(args: Prisma.Subset<T, VagaEmpregoAggregateArgs>): Prisma.PrismaPromise<GetVagaEmpregoAggregateType<T>>;
    groupBy<T extends VagaEmpregoGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: VagaEmpregoGroupByArgs['orderBy'];
    } : {
        orderBy?: VagaEmpregoGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, VagaEmpregoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVagaEmpregoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: VagaEmpregoFieldRefs;
}
export interface Prisma__VagaEmpregoClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface VagaEmpregoFieldRefs {
    readonly idEmprego: Prisma.FieldRef<"VagaEmprego", 'Int'>;
    readonly nomeEmpresa: Prisma.FieldRef<"VagaEmprego", 'String'>;
    readonly cargo: Prisma.FieldRef<"VagaEmprego", 'String'>;
    readonly requisitos: Prisma.FieldRef<"VagaEmprego", 'String'>;
    readonly salario: Prisma.FieldRef<"VagaEmprego", 'String'>;
    readonly beneficios: Prisma.FieldRef<"VagaEmprego", 'String'>;
    readonly descricao: Prisma.FieldRef<"VagaEmprego", 'String'>;
    readonly localizacao: Prisma.FieldRef<"VagaEmprego", 'String'>;
    readonly contato: Prisma.FieldRef<"VagaEmprego", 'String'>;
    readonly areaEmprego: Prisma.FieldRef<"VagaEmprego", 'String'>;
}
export type VagaEmpregoFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VagaEmpregoSelect<ExtArgs> | null;
    omit?: Prisma.VagaEmpregoOmit<ExtArgs> | null;
    where: Prisma.VagaEmpregoWhereUniqueInput;
};
export type VagaEmpregoFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VagaEmpregoSelect<ExtArgs> | null;
    omit?: Prisma.VagaEmpregoOmit<ExtArgs> | null;
    where: Prisma.VagaEmpregoWhereUniqueInput;
};
export type VagaEmpregoFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VagaEmpregoSelect<ExtArgs> | null;
    omit?: Prisma.VagaEmpregoOmit<ExtArgs> | null;
    where?: Prisma.VagaEmpregoWhereInput;
    orderBy?: Prisma.VagaEmpregoOrderByWithRelationInput | Prisma.VagaEmpregoOrderByWithRelationInput[];
    cursor?: Prisma.VagaEmpregoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VagaEmpregoScalarFieldEnum | Prisma.VagaEmpregoScalarFieldEnum[];
};
export type VagaEmpregoFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VagaEmpregoSelect<ExtArgs> | null;
    omit?: Prisma.VagaEmpregoOmit<ExtArgs> | null;
    where?: Prisma.VagaEmpregoWhereInput;
    orderBy?: Prisma.VagaEmpregoOrderByWithRelationInput | Prisma.VagaEmpregoOrderByWithRelationInput[];
    cursor?: Prisma.VagaEmpregoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VagaEmpregoScalarFieldEnum | Prisma.VagaEmpregoScalarFieldEnum[];
};
export type VagaEmpregoFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VagaEmpregoSelect<ExtArgs> | null;
    omit?: Prisma.VagaEmpregoOmit<ExtArgs> | null;
    where?: Prisma.VagaEmpregoWhereInput;
    orderBy?: Prisma.VagaEmpregoOrderByWithRelationInput | Prisma.VagaEmpregoOrderByWithRelationInput[];
    cursor?: Prisma.VagaEmpregoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VagaEmpregoScalarFieldEnum | Prisma.VagaEmpregoScalarFieldEnum[];
};
export type VagaEmpregoCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VagaEmpregoSelect<ExtArgs> | null;
    omit?: Prisma.VagaEmpregoOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VagaEmpregoCreateInput, Prisma.VagaEmpregoUncheckedCreateInput>;
};
export type VagaEmpregoCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.VagaEmpregoCreateManyInput | Prisma.VagaEmpregoCreateManyInput[];
    skipDuplicates?: boolean;
};
export type VagaEmpregoUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VagaEmpregoSelect<ExtArgs> | null;
    omit?: Prisma.VagaEmpregoOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VagaEmpregoUpdateInput, Prisma.VagaEmpregoUncheckedUpdateInput>;
    where: Prisma.VagaEmpregoWhereUniqueInput;
};
export type VagaEmpregoUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.VagaEmpregoUpdateManyMutationInput, Prisma.VagaEmpregoUncheckedUpdateManyInput>;
    where?: Prisma.VagaEmpregoWhereInput;
    limit?: number;
};
export type VagaEmpregoUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VagaEmpregoSelect<ExtArgs> | null;
    omit?: Prisma.VagaEmpregoOmit<ExtArgs> | null;
    where: Prisma.VagaEmpregoWhereUniqueInput;
    create: Prisma.XOR<Prisma.VagaEmpregoCreateInput, Prisma.VagaEmpregoUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.VagaEmpregoUpdateInput, Prisma.VagaEmpregoUncheckedUpdateInput>;
};
export type VagaEmpregoDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VagaEmpregoSelect<ExtArgs> | null;
    omit?: Prisma.VagaEmpregoOmit<ExtArgs> | null;
    where: Prisma.VagaEmpregoWhereUniqueInput;
};
export type VagaEmpregoDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VagaEmpregoWhereInput;
    limit?: number;
};
export type VagaEmpregoDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VagaEmpregoSelect<ExtArgs> | null;
    omit?: Prisma.VagaEmpregoOmit<ExtArgs> | null;
};
