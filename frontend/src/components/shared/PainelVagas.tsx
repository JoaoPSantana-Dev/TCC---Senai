"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { toast } from "sonner";
import { EstruturaVagasMenu } from "@/components/shared/EstruturaMenuVagas";
import type { Vaga } from "@/components/shared/EstruturaMenuVagas.data";
import { FiltroVagas } from "@/components/shared/FiltroVagas";
import { apiUrl } from "@/lib/paginas";
import { eventoVagasAtualizadas } from "@/lib/vagasEditor";
import {
  areasDisponiveis,
  filtrarRegistros,
  linhasPreenchidas,
  paraLista,
  valorDoCampo,
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
  const [carregado, setCarregado] = useState(false);
  const [selecionado, setSelecionado] = useState<Registro | null>(null);

  // estado dos filtros
  const [busca, setBusca] = useState("");
  const [areaSelecionada, setAreaSelecionada] = useState<string | null>(null);

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

  const areas = useMemo(
    () => areasDisponiveis(itens, config.campoArea),
    [itens, config.campoArea],
  );

  const itensFiltrados = useMemo(
    () =>
      filtrarRegistros(itens, {
        busca,
        area: areaSelecionada,
        campoArea: config.campoArea,
        // por padrão busca no título e na empresa (se existir)
        camposBusca: config.camposBusca ?? [config.campoTitulo, "nomeEmpresa"],
      }),
    [itens, busca, areaSelecionada, config.campoArea, config.camposBusca, config.campoTitulo],
  );

  // se o item aberto sumir da lista filtrada, fecha o painel de detalhes
  useEffect(() => {
    if (selecionado && !itensFiltrados.includes(selecionado)) {
      setSelecionado(null);
    }
  }, [itensFiltrados, selecionado]);

  const destaques = linhasPreenchidas(selecionado, config.destaques);
  const detalhes = linhasPreenchidas(selecionado, config.detalhes);

  return (
    <div className="-mx-6 flex w-[calc(100%+3rem)] flex-col items-center md:-mx-12 md:W-[calc(100%+6rem)] lg:mx-0 lg:w-full">
      {carregado && itens.length > 0 && (
        <FiltroVagas
          busca={busca}
          onBuscaChange={setBusca}
          areas={areas}
          areaSelecionada={areaSelecionada}
          onAreaChange={setAreaSelecionada}
          totalResultados={itensFiltrados.length}
          placeholder={config.placeholderBusca}
        />
      )}

      {carregado && itens.length > 0 && itensFiltrados.length === 0 ? (
        <p className="p-6 text-center text-zinc-500">
          Nenhum resultado encontrado com esses filtros.
        </p>
      ) : (
        <EstruturaVagasMenu
          // key reinicia a paginação do menu sempre que o filtro muda
          key={`${busca}-${areaSelecionada ?? "todas"}`}
          itens={itensFiltrados as unknown as Vaga[]}
          onSelecionarVaga={(item) => setSelecionado(item as unknown as Registro)}
        />
      )}

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
                  <b>{rotulo}:</b> {valor}
                </button>
              ))}
              {detalhes.map(({ rotulo, campo, valor }) => (
                <p
                  key={campo}
                  className="mb-2 text-base text-zinc-600 lg:text-lg"
                >
                  <b>{rotulo}:</b> {valor}
                </p>
              ))}
              {destaques.length + detalhes.length === 0 && (
                <p className="text-zinc-500">
                  {valorDoCampo(selecionado, "cargo")} ainda não tem mais
                  detalhes cadastrados
                  detalhes cadastrados
                </p>
              )}
            
          ) : (
            <div className="flex h-full min-h-40 items-center justify-center">
              <p className="text-center text-zinc-400">
                {config.textoSelecionar}
              </p>
            </div>
          )}
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
