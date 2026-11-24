"use client";

import { Search, X } from "lucide-react";
import type { Filtro2FA, FiltroFuncao } from "./useListaUsuarios";
import { focoVisivel } from "./estilos";

interface OpcaoFiltro<T extends string> {
  valor: T;
  texto: string;
}

interface GrupoFiltroProps<T extends string> {
  rotulo: string;
  opcoes: OpcaoFiltro<T>[];
  valor: T;
  aoEscolher: (valor: T) => void;
}

// grupo de botões em que só um fica marcado
function GrupoFiltro<T extends string>({
  rotulo,
  opcoes,
  valor,
  aoEscolher,
}: GrupoFiltroProps<T>) {
  return (
    <div role="group" aria-label={rotulo} className="flex items-center gap-2">
      <span className="text-sm text-zinc-600">{rotulo}</span>
      <div className="flex rounded-full bg-zinc-100 p-0.5">
        {opcoes.map((opcao) => {
          const marcada = opcao.valor === valor;
          return (
            <button
              key={opcao.valor}
              type="button"
              aria-pressed={marcada}
              onClick={() => aoEscolher(opcao.valor)}
              className={`cursor-pointer rounded-full px-3 py-1 text-sm font-medium transition-colors ${focoVisivel} ${
                marcada
                  ? "bg-white text-zinc-900 shadow-sm"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              {opcao.texto}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const opcoesFuncao: OpcaoFiltro<FiltroFuncao>[] = [
  { valor: "todas", texto: "Todas" },
  { valor: "Administrador", texto: "Administrador" },
  { valor: "Visitante", texto: "Visitante" },
];

const opcoes2FA: OpcaoFiltro<Filtro2FA>[] = [
  { valor: "todos", texto: "Todos" },
  { valor: "ativo", texto: "Ativo" },
  { valor: "desativado", texto: "Desativado" },
];

interface BarraFiltrosProps {
  busca: string;
  aoBuscar: (valor: string) => void;
  funcao: FiltroFuncao;
  aoEscolherFuncao: (valor: FiltroFuncao) => void;
  doisFatores: Filtro2FA;
  aoEscolher2FA: (valor: Filtro2FA) => void;
  temFiltros: boolean;
  aoLimpar: () => void;
}

export function BarraFiltros({
  busca,
  aoBuscar,
  funcao,
  aoEscolherFuncao,
  doisFatores,
  aoEscolher2FA,
  temFiltros,
  aoLimpar,
}: BarraFiltrosProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-zinc-200 p-4">
      <div className="relative w-full sm:w-72">
        <label htmlFor="busca-usuarios" className="sr-only">
          Buscar usuários
        </label>
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-zinc-500"
        />
        <input
          id="busca-usuarios"
          type="search"
          value={busca}
          onChange={(e) => aoBuscar(e.target.value)}
          placeholder="Nome, email, unidade ou função"
          className="w-full rounded-full border border-zinc-300 bg-white py-2 pr-4 pl-10 text-sm hover:border-zinc-500 focus-visible:border-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600/25"
        />
      </div>

      <GrupoFiltro
        rotulo="Função"
        opcoes={opcoesFuncao}
        valor={funcao}
        aoEscolher={aoEscolherFuncao}
      />
      <GrupoFiltro
        rotulo="2FA"
        opcoes={opcoes2FA}
        valor={doisFatores}
        aoEscolher={aoEscolher2FA}
      />

      {temFiltros && (
        <button
          type="button"
          onClick={aoLimpar}
          className={`inline-flex cursor-pointer items-center gap-1 rounded text-sm font-medium text-red-700 hover:underline ${focoVisivel}`}
        >
          <X aria-hidden="true" className="size-4" />
          Limpar filtros
        </button>
      )}
    </div>
  );
}
