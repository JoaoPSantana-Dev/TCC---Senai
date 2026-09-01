import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type HorarioAulaModel = runtime.Types.Result.DefaultSelection<Prisma.$HorarioAulaPayload>;
export type AggregateHorarioAula = {
    _count: HorarioAulaCountAggregateOutputType | null;
    _avg: HorarioAulaAvgAggregateOutputType | null;
    _sum: HorarioAulaSumAggregateOutputType | null;
    _min: HorarioAulaMinAggregateOutputType | null;
    _max: HorarioAulaMaxAggregateOutputType | null;
};
export type HorarioAulaAvgAggregateOutputType = {
    idHorariosAula: number | null;
    idSala: number | null;
};
export type HorarioAulaSumAggregateOutputType = {
    idHorariosAula: number | null;
    idSala: number | null;
};
export type HorarioAulaMinAggregateOutputType = {
    idHorariosAula: number | null;
    nomeCurso: string | null;
    turno: string | null;
    idSala: number | null;
};
export type HorarioAulaMaxAggregateOutputType = {
    idHorariosAula: number | null;
    nomeCurso: string | null;
    turno: string | null;
    idSala: number | null;
};
export type HorarioAulaCountAggregateOutputType = {
    idHorariosAula: number;
    nomeCurso: number;
    turno: number;
    idSala: number;
    _all: number;
};
export type HorarioAulaAvgAggregateInputType = {
    idHorariosAula?: true;
    idSala?: true;
};
export type HorarioAulaSumAggregateInputType = {
    idHorariosAula?: true;
    idSala?: true;
};
export type HorarioAulaMinAggregateInputType = {
    idHorariosAula?: true;
    nomeCurso?: true;
    turno?: true;
    idSala?: true;
};
export type HorarioAulaMaxAggregateInputType = {
    idHorariosAula?: true;
    nomeCurso?: true;
    turno?: true;
    idSala?: true;
};
export type HorarioAulaCountAggregateInputType = {
    idHorariosAula?: true;
    nomeCurso?: true;
    turno?: true;
    idSala?: true;
    _all?: true;
};
export type HorarioAulaAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HorarioAulaWhereInput;
    orderBy?: Prisma.HorarioAulaOrderByWithRelationInput | Prisma.HorarioAulaOrderByWithRelationInput[];
    cursor?: Prisma.HorarioAulaWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | HorarioAulaCountAggregateInputType;
    _avg?: HorarioAulaAvgAggregateInputType;
    _sum?: HorarioAulaSumAggregateInputType;
    _min?: HorarioAulaMinAggregateInputType;
    _max?: HorarioAulaMaxAggregateInputType;
};
export type GetHorarioAulaAggregateType<T extends HorarioAulaAggregateArgs> = {
    [P in keyof T & keyof AggregateHorarioAula]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateHorarioAula[P]> : Prisma.GetScalarType<T[P], AggregateHorarioAula[P]>;
};
export type HorarioAulaGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HorarioAulaWhereInput;
    orderBy?: Prisma.HorarioAulaOrderByWithAggregationInput | Prisma.HorarioAulaOrderByWithAggregationInput[];
    by: Prisma.HorarioAulaScalarFieldEnum[] | Prisma.HorarioAulaScalarFieldEnum;
    having?: Prisma.HorarioAulaScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: HorarioAulaCountAggregateInputType | true;
    _avg?: HorarioAulaAvgAggregateInputType;
    _sum?: HorarioAulaSumAggregateInputType;
    _min?: HorarioAulaMinAggregateInputType;
    _max?: HorarioAulaMaxAggregateInputType;
};
export type HorarioAulaGroupByOutputType = {
    idHorariosAula: number;
    nomeCurso: string;
    turno: string;
    idSala: number;
    _count: HorarioAulaCountAggregateOutputType | null;
    _avg: HorarioAulaAvgAggregateOutputType | null;
    _sum: HorarioAulaSumAggregateOutputType | null;
    _min: HorarioAulaMinAggregateOutputType | null;
    _max: HorarioAulaMaxAggregateOutputType | null;
};
export type GetHorarioAulaGroupByPayload<T extends HorarioAulaGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<HorarioAulaGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof HorarioAulaGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], HorarioAulaGroupByOutputType[P]> : Prisma.GetScalarType<T[P], HorarioAulaGroupByOutputType[P]>;
}>>;
export type HorarioAulaWhereInput = {
    AND?: Prisma.HorarioAulaWhereInput | Prisma.HorarioAulaWhereInput[];
    OR?: Prisma.HorarioAulaWhereInput[];
    NOT?: Prisma.HorarioAulaWhereInput | Prisma.HorarioAulaWhereInput[];
    idHorariosAula?: Prisma.IntFilter<"HorarioAula"> | number;
    nomeCurso?: Prisma.StringFilter<"HorarioAula"> | string;
    turno?: Prisma.StringFilter<"HorarioAula"> | string;
    idSala?: Prisma.IntFilter<"HorarioAula"> | number;
    sala?: Prisma.XOR<Prisma.SalaScalarRelationFilter, Prisma.SalaWhereInput>;
};
export type HorarioAulaOrderByWithRelationInput = {
    idHorariosAula?: Prisma.SortOrder;
    nomeCurso?: Prisma.SortOrder;
    turno?: Prisma.SortOrder;
    idSala?: Prisma.SortOrder;
    sala?: Prisma.SalaOrderByWithRelationInput;
    _relevance?: Prisma.HorarioAulaOrderByRelevanceInput;
};
export type HorarioAulaWhereUniqueInput = Prisma.AtLeast<{
    idHorariosAula?: number;
    AND?: Prisma.HorarioAulaWhereInput | Prisma.HorarioAulaWhereInput[];
    OR?: Prisma.HorarioAulaWhereInput[];
    NOT?: Prisma.HorarioAulaWhereInput | Prisma.HorarioAulaWhereInput[];
    nomeCurso?: Prisma.StringFilter<"HorarioAula"> | string;
    turno?: Prisma.StringFilter<"HorarioAula"> | string;
    idSala?: Prisma.IntFilter<"HorarioAula"> | number;
    sala?: Prisma.XOR<Prisma.SalaScalarRelationFilter, Prisma.SalaWhereInput>;
}, "idHorariosAula">;
export type HorarioAulaOrderByWithAggregationInput = {
    idHorariosAula?: Prisma.SortOrder;
    nomeCurso?: Prisma.SortOrder;
    turno?: Prisma.SortOrder;
    idSala?: Prisma.SortOrder;
    _count?: Prisma.HorarioAulaCountOrderByAggregateInput;
    _avg?: Prisma.HorarioAulaAvgOrderByAggregateInput;
    _max?: Prisma.HorarioAulaMaxOrderByAggregateInput;
    _min?: Prisma.HorarioAulaMinOrderByAggregateInput;
    _sum?: Prisma.HorarioAulaSumOrderByAggregateInput;
};
export type HorarioAulaScalarWhereWithAggregatesInput = {
    AND?: Prisma.HorarioAulaScalarWhereWithAggregatesInput | Prisma.HorarioAulaScalarWhereWithAggregatesInput[];
    OR?: Prisma.HorarioAulaScalarWhereWithAggregatesInput[];
    NOT?: Prisma.HorarioAulaScalarWhereWithAggregatesInput | Prisma.HorarioAulaScalarWhereWithAggregatesInput[];
    idHorariosAula?: Prisma.IntWithAggregatesFilter<"HorarioAula"> | number;
    nomeCurso?: Prisma.StringWithAggregatesFilter<"HorarioAula"> | string;
    turno?: Prisma.StringWithAggregatesFilter<"HorarioAula"> | string;
    idSala?: Prisma.IntWithAggregatesFilter<"HorarioAula"> | number;
};
export type HorarioAulaCreateInput = {
    nomeCurso: string;
    turno: string;
    sala: Prisma.SalaCreateNestedOneWithoutHorariosInput;
};
export type HorarioAulaUncheckedCreateInput = {
    idHorariosAula?: number;
    nomeCurso: string;
    turno: string;
    idSala: number;
};
export type HorarioAulaUpdateInput = {
    nomeCurso?: Prisma.StringFieldUpdateOperationsInput | string;
    turno?: Prisma.StringFieldUpdateOperationsInput | string;
    sala?: Prisma.SalaUpdateOneRequiredWithoutHorariosNestedInput;
};
export type HorarioAulaUncheckedUpdateInput = {
    idHorariosAula?: Prisma.IntFieldUpdateOperationsInput | number;
    nomeCurso?: Prisma.StringFieldUpdateOperationsInput | string;
    turno?: Prisma.StringFieldUpdateOperationsInput | string;
    idSala?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type HorarioAulaCreateManyInput = {
    idHorariosAula?: number;
    nomeCurso: string;
    turno: string;
    idSala: number;
};
export type HorarioAulaUpdateManyMutationInput = {
    nomeCurso?: Prisma.StringFieldUpdateOperationsInput | string;
    turno?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type HorarioAulaUncheckedUpdateManyInput = {
    idHorariosAula?: Prisma.IntFieldUpdateOperationsInput | number;
    nomeCurso?: Prisma.StringFieldUpdateOperationsInput | string;
    turno?: Prisma.StringFieldUpdateOperationsInput | string;
    idSala?: Prisma.IntFieldUpdateOperationsInput | number;
};
export type HorarioAulaListRelationFilter = {
    every?: Prisma.HorarioAulaWhereInput;
    some?: Prisma.HorarioAulaWhereInput;
    none?: Prisma.HorarioAulaWhereInput;
};
export type HorarioAulaOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type HorarioAulaOrderByRelevanceInput = {
    fields: Prisma.HorarioAulaOrderByRelevanceFieldEnum | Prisma.HorarioAulaOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type HorarioAulaCountOrderByAggregateInput = {
    idHorariosAula?: Prisma.SortOrder;
    nomeCurso?: Prisma.SortOrder;
    turno?: Prisma.SortOrder;
    idSala?: Prisma.SortOrder;
};
export type HorarioAulaAvgOrderByAggregateInput = {
    idHorariosAula?: Prisma.SortOrder;
    idSala?: Prisma.SortOrder;
};
export type HorarioAulaMaxOrderByAggregateInput = {
    idHorariosAula?: Prisma.SortOrder;
    nomeCurso?: Prisma.SortOrder;
    turno?: Prisma.SortOrder;
    idSala?: Prisma.SortOrder;
};
export type HorarioAulaMinOrderByAggregateInput = {
    idHorariosAula?: Prisma.SortOrder;
    nomeCurso?: Prisma.SortOrder;
    turno?: Prisma.SortOrder;
    idSala?: Prisma.SortOrder;
};
export type HorarioAulaSumOrderByAggregateInput = {
    idHorariosAula?: Prisma.SortOrder;
    idSala?: Prisma.SortOrder;
};
export type HorarioAulaCreateNestedManyWithoutSalaInput = {
    create?: Prisma.XOR<Prisma.HorarioAulaCreateWithoutSalaInput, Prisma.HorarioAulaUncheckedCreateWithoutSalaInput> | Prisma.HorarioAulaCreateWithoutSalaInput[] | Prisma.HorarioAulaUncheckedCreateWithoutSalaInput[];
    connectOrCreate?: Prisma.HorarioAulaCreateOrConnectWithoutSalaInput | Prisma.HorarioAulaCreateOrConnectWithoutSalaInput[];
    createMany?: Prisma.HorarioAulaCreateManySalaInputEnvelope;
    connect?: Prisma.HorarioAulaWhereUniqueInput | Prisma.HorarioAulaWhereUniqueInput[];
};
export type HorarioAulaUncheckedCreateNestedManyWithoutSalaInput = {
    create?: Prisma.XOR<Prisma.HorarioAulaCreateWithoutSalaInput, Prisma.HorarioAulaUncheckedCreateWithoutSalaInput> | Prisma.HorarioAulaCreateWithoutSalaInput[] | Prisma.HorarioAulaUncheckedCreateWithoutSalaInput[];
    connectOrCreate?: Prisma.HorarioAulaCreateOrConnectWithoutSalaInput | Prisma.HorarioAulaCreateOrConnectWithoutSalaInput[];
    createMany?: Prisma.HorarioAulaCreateManySalaInputEnvelope;
    connect?: Prisma.HorarioAulaWhereUniqueInput | Prisma.HorarioAulaWhereUniqueInput[];
};
export type HorarioAulaUpdateManyWithoutSalaNestedInput = {
    create?: Prisma.XOR<Prisma.HorarioAulaCreateWithoutSalaInput, Prisma.HorarioAulaUncheckedCreateWithoutSalaInput> | Prisma.HorarioAulaCreateWithoutSalaInput[] | Prisma.HorarioAulaUncheckedCreateWithoutSalaInput[];
    connectOrCreate?: Prisma.HorarioAulaCreateOrConnectWithoutSalaInput | Prisma.HorarioAulaCreateOrConnectWithoutSalaInput[];
    upsert?: Prisma.HorarioAulaUpsertWithWhereUniqueWithoutSalaInput | Prisma.HorarioAulaUpsertWithWhereUniqueWithoutSalaInput[];
    createMany?: Prisma.HorarioAulaCreateManySalaInputEnvelope;
    set?: Prisma.HorarioAulaWhereUniqueInput | Prisma.HorarioAulaWhereUniqueInput[];
    disconnect?: Prisma.HorarioAulaWhereUniqueInput | Prisma.HorarioAulaWhereUniqueInput[];
    delete?: Prisma.HorarioAulaWhereUniqueInput | Prisma.HorarioAulaWhereUniqueInput[];
    connect?: Prisma.HorarioAulaWhereUniqueInput | Prisma.HorarioAulaWhereUniqueInput[];
    update?: Prisma.HorarioAulaUpdateWithWhereUniqueWithoutSalaInput | Prisma.HorarioAulaUpdateWithWhereUniqueWithoutSalaInput[];
    updateMany?: Prisma.HorarioAulaUpdateManyWithWhereWithoutSalaInput | Prisma.HorarioAulaUpdateManyWithWhereWithoutSalaInput[];
    deleteMany?: Prisma.HorarioAulaScalarWhereInput | Prisma.HorarioAulaScalarWhereInput[];
};
export type HorarioAulaUncheckedUpdateManyWithoutSalaNestedInput = {
    create?: Prisma.XOR<Prisma.HorarioAulaCreateWithoutSalaInput, Prisma.HorarioAulaUncheckedCreateWithoutSalaInput> | Prisma.HorarioAulaCreateWithoutSalaInput[] | Prisma.HorarioAulaUncheckedCreateWithoutSalaInput[];
    connectOrCreate?: Prisma.HorarioAulaCreateOrConnectWithoutSalaInput | Prisma.HorarioAulaCreateOrConnectWithoutSalaInput[];
    upsert?: Prisma.HorarioAulaUpsertWithWhereUniqueWithoutSalaInput | Prisma.HorarioAulaUpsertWithWhereUniqueWithoutSalaInput[];
    createMany?: Prisma.HorarioAulaCreateManySalaInputEnvelope;
    set?: Prisma.HorarioAulaWhereUniqueInput | Prisma.HorarioAulaWhereUniqueInput[];
    disconnect?: Prisma.HorarioAulaWhereUniqueInput | Prisma.HorarioAulaWhereUniqueInput[];
    delete?: Prisma.HorarioAulaWhereUniqueInput | Prisma.HorarioAulaWhereUniqueInput[];
    connect?: Prisma.HorarioAulaWhereUniqueInput | Prisma.HorarioAulaWhereUniqueInput[];
    update?: Prisma.HorarioAulaUpdateWithWhereUniqueWithoutSalaInput | Prisma.HorarioAulaUpdateWithWhereUniqueWithoutSalaInput[];
    updateMany?: Prisma.HorarioAulaUpdateManyWithWhereWithoutSalaInput | Prisma.HorarioAulaUpdateManyWithWhereWithoutSalaInput[];
    deleteMany?: Prisma.HorarioAulaScalarWhereInput | Prisma.HorarioAulaScalarWhereInput[];
};
export type HorarioAulaCreateWithoutSalaInput = {
    nomeCurso: string;
    turno: string;
};
export type HorarioAulaUncheckedCreateWithoutSalaInput = {
    idHorariosAula?: number;
    nomeCurso: string;
    turno: string;
};
export type HorarioAulaCreateOrConnectWithoutSalaInput = {
    where: Prisma.HorarioAulaWhereUniqueInput;
    create: Prisma.XOR<Prisma.HorarioAulaCreateWithoutSalaInput, Prisma.HorarioAulaUncheckedCreateWithoutSalaInput>;
};
export type HorarioAulaCreateManySalaInputEnvelope = {
    data: Prisma.HorarioAulaCreateManySalaInput | Prisma.HorarioAulaCreateManySalaInput[];
    skipDuplicates?: boolean;
};
export type HorarioAulaUpsertWithWhereUniqueWithoutSalaInput = {
    where: Prisma.HorarioAulaWhereUniqueInput;
    update: Prisma.XOR<Prisma.HorarioAulaUpdateWithoutSalaInput, Prisma.HorarioAulaUncheckedUpdateWithoutSalaInput>;
    create: Prisma.XOR<Prisma.HorarioAulaCreateWithoutSalaInput, Prisma.HorarioAulaUncheckedCreateWithoutSalaInput>;
};
export type HorarioAulaUpdateWithWhereUniqueWithoutSalaInput = {
    where: Prisma.HorarioAulaWhereUniqueInput;
    data: Prisma.XOR<Prisma.HorarioAulaUpdateWithoutSalaInput, Prisma.HorarioAulaUncheckedUpdateWithoutSalaInput>;
};
export type HorarioAulaUpdateManyWithWhereWithoutSalaInput = {
    where: Prisma.HorarioAulaScalarWhereInput;
    data: Prisma.XOR<Prisma.HorarioAulaUpdateManyMutationInput, Prisma.HorarioAulaUncheckedUpdateManyWithoutSalaInput>;
};
export type HorarioAulaScalarWhereInput = {
    AND?: Prisma.HorarioAulaScalarWhereInput | Prisma.HorarioAulaScalarWhereInput[];
    OR?: Prisma.HorarioAulaScalarWhereInput[];
    NOT?: Prisma.HorarioAulaScalarWhereInput | Prisma.HorarioAulaScalarWhereInput[];
    idHorariosAula?: Prisma.IntFilter<"HorarioAula"> | number;
    nomeCurso?: Prisma.StringFilter<"HorarioAula"> | string;
    turno?: Prisma.StringFilter<"HorarioAula"> | string;
    idSala?: Prisma.IntFilter<"HorarioAula"> | number;
};
export type HorarioAulaCreateManySalaInput = {
    idHorariosAula?: number;
    nomeCurso: string;
    turno: string;
};
export type HorarioAulaUpdateWithoutSalaInput = {
    nomeCurso?: Prisma.StringFieldUpdateOperationsInput | string;
    turno?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type HorarioAulaUncheckedUpdateWithoutSalaInput = {
    idHorariosAula?: Prisma.IntFieldUpdateOperationsInput | number;
    nomeCurso?: Prisma.StringFieldUpdateOperationsInput | string;
    turno?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type HorarioAulaUncheckedUpdateManyWithoutSalaInput = {
    idHorariosAula?: Prisma.IntFieldUpdateOperationsInput | number;
    nomeCurso?: Prisma.StringFieldUpdateOperationsInput | string;
    turno?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type HorarioAulaSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    idHorariosAula?: boolean;
    nomeCurso?: boolean;
    turno?: boolean;
    idSala?: boolean;
    sala?: boolean | Prisma.SalaDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["horarioAula"]>;
export type HorarioAulaSelectScalar = {
    idHorariosAula?: boolean;
    nomeCurso?: boolean;
    turno?: boolean;
    idSala?: boolean;
};
export type HorarioAulaOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"idHorariosAula" | "nomeCurso" | "turno" | "idSala", ExtArgs["result"]["horarioAula"]>;
export type HorarioAulaInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    sala?: boolean | Prisma.SalaDefaultArgs<ExtArgs>;
};
export type $HorarioAulaPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "HorarioAula";
    objects: {
        sala: Prisma.$SalaPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        idHorariosAula: number;
        nomeCurso: string;
        turno: string;
        idSala: number;
    }, ExtArgs["result"]["horarioAula"]>;
    composites: {};
};
export type HorarioAulaGetPayload<S extends boolean | null | undefined | HorarioAulaDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$HorarioAulaPayload, S>;
export type HorarioAulaCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<HorarioAulaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: HorarioAulaCountAggregateInputType | true;
};
export interface HorarioAulaDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['HorarioAula'];
        meta: {
            name: 'HorarioAula';
        };
    };
    findUnique<T extends HorarioAulaFindUniqueArgs>(args: Prisma.SelectSubset<T, HorarioAulaFindUniqueArgs<ExtArgs>>): Prisma.Prisma__HorarioAulaClient<runtime.Types.Result.GetResult<Prisma.$HorarioAulaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends HorarioAulaFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, HorarioAulaFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__HorarioAulaClient<runtime.Types.Result.GetResult<Prisma.$HorarioAulaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends HorarioAulaFindFirstArgs>(args?: Prisma.SelectSubset<T, HorarioAulaFindFirstArgs<ExtArgs>>): Prisma.Prisma__HorarioAulaClient<runtime.Types.Result.GetResult<Prisma.$HorarioAulaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends HorarioAulaFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, HorarioAulaFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__HorarioAulaClient<runtime.Types.Result.GetResult<Prisma.$HorarioAulaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends HorarioAulaFindManyArgs>(args?: Prisma.SelectSubset<T, HorarioAulaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$HorarioAulaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends HorarioAulaCreateArgs>(args: Prisma.SelectSubset<T, HorarioAulaCreateArgs<ExtArgs>>): Prisma.Prisma__HorarioAulaClient<runtime.Types.Result.GetResult<Prisma.$HorarioAulaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends HorarioAulaCreateManyArgs>(args?: Prisma.SelectSubset<T, HorarioAulaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends HorarioAulaDeleteArgs>(args: Prisma.SelectSubset<T, HorarioAulaDeleteArgs<ExtArgs>>): Prisma.Prisma__HorarioAulaClient<runtime.Types.Result.GetResult<Prisma.$HorarioAulaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends HorarioAulaUpdateArgs>(args: Prisma.SelectSubset<T, HorarioAulaUpdateArgs<ExtArgs>>): Prisma.Prisma__HorarioAulaClient<runtime.Types.Result.GetResult<Prisma.$HorarioAulaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends HorarioAulaDeleteManyArgs>(args?: Prisma.SelectSubset<T, HorarioAulaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends HorarioAulaUpdateManyArgs>(args: Prisma.SelectSubset<T, HorarioAulaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends HorarioAulaUpsertArgs>(args: Prisma.SelectSubset<T, HorarioAulaUpsertArgs<ExtArgs>>): Prisma.Prisma__HorarioAulaClient<runtime.Types.Result.GetResult<Prisma.$HorarioAulaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends HorarioAulaCountArgs>(args?: Prisma.Subset<T, HorarioAulaCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], HorarioAulaCountAggregateOutputType> : number>;
    aggregate<T extends HorarioAulaAggregateArgs>(args: Prisma.Subset<T, HorarioAulaAggregateArgs>): Prisma.PrismaPromise<GetHorarioAulaAggregateType<T>>;
    groupBy<T extends HorarioAulaGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: HorarioAulaGroupByArgs['orderBy'];
    } : {
        orderBy?: HorarioAulaGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, HorarioAulaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHorarioAulaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: HorarioAulaFieldRefs;
}
export interface Prisma__HorarioAulaClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    sala<T extends Prisma.SalaDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SalaDefaultArgs<ExtArgs>>): Prisma.Prisma__SalaClient<runtime.Types.Result.GetResult<Prisma.$SalaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface HorarioAulaFieldRefs {
    readonly idHorariosAula: Prisma.FieldRef<"HorarioAula", 'Int'>;
    readonly nomeCurso: Prisma.FieldRef<"HorarioAula", 'String'>;
    readonly turno: Prisma.FieldRef<"HorarioAula", 'String'>;
    readonly idSala: Prisma.FieldRef<"HorarioAula", 'Int'>;
}
export type HorarioAulaFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HorarioAulaSelect<ExtArgs> | null;
    omit?: Prisma.HorarioAulaOmit<ExtArgs> | null;
    include?: Prisma.HorarioAulaInclude<ExtArgs> | null;
    where: Prisma.HorarioAulaWhereUniqueInput;
};
export type HorarioAulaFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HorarioAulaSelect<ExtArgs> | null;
    omit?: Prisma.HorarioAulaOmit<ExtArgs> | null;
    include?: Prisma.HorarioAulaInclude<ExtArgs> | null;
    where: Prisma.HorarioAulaWhereUniqueInput;
};
export type HorarioAulaFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type HorarioAulaFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type HorarioAulaFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type HorarioAulaCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HorarioAulaSelect<ExtArgs> | null;
    omit?: Prisma.HorarioAulaOmit<ExtArgs> | null;
    include?: Prisma.HorarioAulaInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.HorarioAulaCreateInput, Prisma.HorarioAulaUncheckedCreateInput>;
};
export type HorarioAulaCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.HorarioAulaCreateManyInput | Prisma.HorarioAulaCreateManyInput[];
    skipDuplicates?: boolean;
};
export type HorarioAulaUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HorarioAulaSelect<ExtArgs> | null;
    omit?: Prisma.HorarioAulaOmit<ExtArgs> | null;
    include?: Prisma.HorarioAulaInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.HorarioAulaUpdateInput, Prisma.HorarioAulaUncheckedUpdateInput>;
    where: Prisma.HorarioAulaWhereUniqueInput;
};
export type HorarioAulaUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.HorarioAulaUpdateManyMutationInput, Prisma.HorarioAulaUncheckedUpdateManyInput>;
    where?: Prisma.HorarioAulaWhereInput;
    limit?: number;
};
export type HorarioAulaUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HorarioAulaSelect<ExtArgs> | null;
    omit?: Prisma.HorarioAulaOmit<ExtArgs> | null;
    include?: Prisma.HorarioAulaInclude<ExtArgs> | null;
    where: Prisma.HorarioAulaWhereUniqueInput;
    create: Prisma.XOR<Prisma.HorarioAulaCreateInput, Prisma.HorarioAulaUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.HorarioAulaUpdateInput, Prisma.HorarioAulaUncheckedUpdateInput>;
};
export type HorarioAulaDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HorarioAulaSelect<ExtArgs> | null;
    omit?: Prisma.HorarioAulaOmit<ExtArgs> | null;
    include?: Prisma.HorarioAulaInclude<ExtArgs> | null;
    where: Prisma.HorarioAulaWhereUniqueInput;
};
export type HorarioAulaDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.HorarioAulaWhereInput;
    limit?: number;
};
export type HorarioAulaDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.HorarioAulaSelect<ExtArgs> | null;
    omit?: Prisma.HorarioAulaOmit<ExtArgs> | null;
    include?: Prisma.HorarioAulaInclude<ExtArgs> | null;
};
