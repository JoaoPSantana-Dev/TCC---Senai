"use client";

import { useEffect, useMemo, useState } from "react";
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
  type ItemLista,
  type Registro,
} from "@/lib/painelVagas";

// lista de vagas e detalhes buscados do banco
// serve para vagas de emprego, de estágios e de cursos
// os três só passam a sua configuração da rota do backend e quais campos mostrar

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
          toast.error(dados?.message || "Erro ao buscar os dados");
          return;
        }
        setRegistros(Array.isArray(dados) ? dados : []);
        setSelecionado(null);
        setCarregado(true);
      } catch {
        if (ativo) toast.error("Falha ao conectar com o servidor");
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

  const itens = useMemo(
    () => paraLista(registros, config.campoTitulo),
    [registros, config.campoTitulo],
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

      {carregado && itens.length === 0 && (
        <p className="mb-4 text-center text-zinc-500">{config.textoVazio}</p>
      )}

      <section className="mb-8 w-full bg-[#f9f9f9] p-8 shadow-md lg:w-3/4 lg:rounded-2xl">
        <div className="min-h-50 w-full rounded-2xl bg-white p-6 shadow-md">
          {selecionado ? (
            <>
              {destaques.map(({ rotulo, campo, valor }, indice) => (
                <h2
                  key={campo}
                  className={`mb-4 font-semibold text-zinc-700 ${
                    indice === 0 ? "text-xl lg:text-2xl" : "text-lg lg:text-xl"
                  }`}
                >
                  <b>{rotulo}:</b> {valor}
                </h2>
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
            </>
          ) : (
            <div className="flex h-full min-h-40 items-center justify-center">
              <p className="text-center text-zinc-400">
                {config.textoSelecionar}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
