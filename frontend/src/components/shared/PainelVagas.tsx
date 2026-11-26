"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { CartaoVaga } from "@/components/shared/CartaoVaga";
import { apiUrl } from "@/lib/paginas";
import { eventoVagasAtualizadas } from "@/lib/vagasEditor";
import {
  areasDisponiveis,
  filtrarRegistros,
  idDoItem,
  type ConfigPainel,
  type Registro,
} from "@/lib/painelVagas";

// lista de vagas ou de cursos buscada do banco, no formato de quadro de vagas:
// uma linha por item, com a área e o salário à direita, e os detalhes abrem ao tocar
// serve para vagas de emprego, de estágio e de cursos
// os três só passam a sua configuração da rota do backend e quais campos mostrar

const porVez = 8;

type Estado = "carregando" | "pronto" | "erro";

export function PainelVagas({ config }: { config: ConfigPainel }) {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [estado, setEstado] = useState<Estado>("carregando");
  const [versao, setVersao] = useState(0);
  const [abertoId, setAbertoId] = useState<string | null>(null);
  const [busca, setBusca] = useState("");
  const [area, setArea] = useState("");
  const [limite, setLimite] = useState(porVez);

  useEffect(() => {
    let ativo = true;

    async function buscar() {
      try {
        const resposta = await fetch(`${apiUrl}${config.caminho}`, {
          cache: "no-store",
        });
        const dados = await resposta.json().catch(() => null);
        if (!ativo) return;

        if (!resposta.ok) {
          setEstado("erro");
          toast.error(dados?.message || "Erro ao buscar os dados");
          return;
        }
        setRegistros(Array.isArray(dados) ? dados : []);
        setAbertoId(null);
        setEstado("pronto");
      } catch {
        if (!ativo) return;
        setEstado("erro");
        toast.error("Falha ao conectar com o servidor");
      }
    }

    buscar();
    return () => {
      ativo = false;
    };
  }, [config.caminho, versao]);

  // no editor de páginas, o painel lateral avisa quando alguma vaga muda e busca a lista de novo
  useEffect(() => {
    const ouvir = (evento: Event) => {
      const { caminho } =
        (evento as CustomEvent<{ caminho?: string }>).detail ?? {};
      if (caminho === config.caminho) setVersao((atual) => atual + 1);
    };

    window.addEventListener(eventoVagasAtualizadas, ouvir);
    return () => window.removeEventListener(eventoVagasAtualizadas, ouvir);
  }, [config.caminho]);

  const areas = useMemo(
    () => areasDisponiveis(registros, config.campoArea),
    [registros, config.campoArea],
  );
  const filtrados = useMemo(
    () => filtrarRegistros(registros, config, busca, area),
    [registros, config, busca, area],
  );
  const visiveis = filtrados.slice(0, limite);
  const temFiltros = busca !== "" || area !== "";

  // qualquer mudança de filtro volta a mostrar só os primeiros
  function alterarBusca(valor: string) {
    setBusca(valor);
    setLimite(porVez);
  }
  function alterarArea(valor: string) {
    setArea(valor);
    setLimite(porVez);
  }
  function limparFiltros() {
    setBusca("");
    setArea("");
    setLimite(porVez);
  }
  function tentarDeNovo() {
    setEstado("carregando");
    setVersao((atual) => atual + 1);
  }

  if (estado === "carregando") {
    return (
      <div
        role="status"
        aria-label="Carregando"
        className="flex mx-auto w-full max-w-4xl flex-col gap-3 px-4 pb-8"
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex h-24 animate-pulse items-center gap-4 rounded-2xl bg-white p-5 shadow-md motion-reduce:animate-none"
          >
            <span className="size-14 rounded-xl bg-zinc-200" />
            <span className="flex flex-1 flex-col gap-2">
              <span className="h-4 w-1/2 rounded bg-zinc-200" />
              <span className="h-3 w-1/3 rounded bg-zinc-100" />
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (estado === "erro") {
    return (
      <div
        role="alert"
        className="flex mx-auto w-full max-w-4xl flex-col items-center gap-3 px-4 pb-8 text-center"
      >
        <p className="text-zinc-700">Não foi possível carregar a lista.</p>
        <button
          type="button"
          onClick={tentarDeNovo}
          className="cursor-pointer rounded-full bg-red-600 px-6 py-2.5 text-base font-semibold text-white hover:bg-red-700 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          Tentar de novo
        </button>
      </div>
    );
  }

  if (registros.length === 0) {
    return (
      <p className="px-4 pb-8 text-center text-zinc-500">{config.textoVazio}</p>
    );
  }

  return (
    <div className="flex mx-auto w-full max-w-4xl flex-col gap-4 px-4 pb-8">
      <div className="flex flex-col gap-3">
        <div className="relative">
          <label htmlFor={`busca-${config.caminho}`} className="sr-only">
            Buscar {config.nomePlural}
          </label>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-zinc-500"
          />
          <input
            id={`busca-${config.caminho}`}
            type="search"
            value={busca}
            onChange={(e) => alterarBusca(e.target.value)}
            placeholder={`Buscar ${config.nomePlural}`}
            className="w-full rounded-full border border-zinc-300 bg-white py-3 pr-5 pl-12 text-base focus-visible:border-red-600 focus-visible:ring-2 focus-visible:ring-red-600/25 focus-visible:outline-none"
          />
        </div>

        {areas.length > 1 && (
          <div
            role="group"
            aria-label="Filtrar por área"
            className="flex flex-wrap gap-2"
          >
            {["", ...areas].map((opcao) => {
              const marcada = opcao === area;
              return (
                <button
                  key={opcao || "todas"}
                  type="button"
                  aria-pressed={marcada}
                  onClick={() => alterarArea(opcao)}
                  className={`cursor-pointer touch-manipulation rounded-full px-4 py-2 text-base font-medium transition-colors focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:outline-none ${
                    marcada
                      ? "bg-red-600 text-white"
                      : "bg-white text-zinc-700 shadow-sm hover:bg-zinc-50"
                  }`}
                >
                  {opcao || "Todas as áreas"}
                </button>
              );
            })}
          </div>
        )}

        <p aria-live="polite" className="text-sm text-zinc-600">
          {filtrados.length}{" "}
          {filtrados.length === 1 ? config.nomeSingular : config.nomePlural}
          {temFiltros &&
            " encontrad" +
              (config.nomeSingular === "curso" ? "o" : "a") +
              (filtrados.length === 1 ? "" : "s")}
        </p>
      </div>

      {filtrados.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-2xl bg-white p-8 text-center shadow-md">
          <p className="font-medium text-zinc-800">
            Nenhum resultado para essa busca
          </p>
          <button
            type="button"
            onClick={limparFiltros}
            className="cursor-pointer rounded text-base font-medium text-red-700 hover:underline focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:outline-none"
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {visiveis.map((registro, indice) => {
            const id = idDoItem(config, registro, indice);
            return (
              <CartaoVaga
                key={id}
                config={config}
                registro={registro}
                aberto={abertoId === id}
                aoAlternar={() => setAbertoId(abertoId === id ? null : id)}
              />
            );
          })}
        </ul>
      )}

      {filtrados.length > visiveis.length && (
        <button
          type="button"
          onClick={() => setLimite((atual) => atual + porVez)}
          className="cursor-pointer self-center rounded-full border border-zinc-300 bg-white px-6 py-2.5 text-base font-semibold text-zinc-800 hover:bg-zinc-50 focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          Ver mais {config.nomePlural}
        </button>
      )}
    </div>
  );
}