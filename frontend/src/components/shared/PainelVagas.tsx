"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { EstruturaVagasMenu } from "@/components/shared/EstruturaMenuVagas";
import { apiUrl } from "@/lib/paginas";
import {
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
  const [selecionado, setSelecionado] = useState<ItemLista | null>(null);

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
        setCarregado(true);
      } catch {
        if (ativo) toast.error("Falha ao conectar com o servidor");
      }
    }

    buscar();
    return () => {
      ativo = false;
    };
  }, [config.caminho]);

  const itens = useMemo(
    () => paraLista(registros, config.campoTitulo),
    [registros, config.campoTitulo],
  );
  const destaques = linhasPreenchidas(selecionado, config.destaques);
  const detalhes = linhasPreenchidas(selecionado, config.detalhes);

  return (
    <div className="flex w-full flex-col items-center">
      <EstruturaVagasMenu
        itens={itens}
        // o menu devolve o mesmo objeto que recebeu; achamos o registro completo por referência
        onSelecionarVaga={(item) =>
          setSelecionado(itens.find((i) => i === item) ?? null)
        }
      />

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
                  className={`mb-4 font-semibold text-zinc-700 ${indice === 0 ? "text-xl lg:text-2xl" : "text-lg lg:text-xl"}`}
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
                  detalhes cadastrados.
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
