"use client";

import { useEffect, useMemo, useState } from "react";
import type { IconeMenu } from "@/lib/paginas";
import {
  elementosDoIcone,
  limparIcone,
  rotuloDoIcone,
  type DadosIcone,
} from "@/lib/iconeSvg";
import { IconeSvg } from "@/components/shared/IconeSvg";

// escolhe um ícone entre todos os do Hugeicons
// cada ícone aparece desenhado, com o nome embaixo
// o pacote inteiro só é baixado quando o seletor é aberto pela primeira vez

const porPagina = 48;

interface ItemCatalogo {
  nome: string;
  rotulo: string;
  busca: string;
  dados: DadosIcone;
}

interface SeletorIconeProps {
  valor: IconeMenu | null;
  onChange: (icone: IconeMenu | null) => void;
}

export function SeletorIcone({ valor, onChange }: SeletorIconeProps) {
  const [aberto, setAberto] = useState(false);
  const [busca, setBusca] = useState("");
  const [limite, setLimite] = useState(porPagina);
  const [catalogo, setCatalogo] = useState<ItemCatalogo[] | null>(null);
  const [falhou, setFalhou] = useState(false);

  useEffect(() => {
    if (!aberto || catalogo) return;

    let cancelado = false;
    import("@hugeicons/core-free-icons")
      .then((modulo) => {
        if (cancelado) return;

        const itens: ItemCatalogo[] = [];
        for (const [nome, dados] of Object.entries(modulo)) {
          if (!nome.endsWith("Icon") || elementosDoIcone(dados).length === 0)
            continue;
          itens.push({
            nome,
            rotulo: rotuloDoIcone(nome),
            busca: nome.toLowerCase(),
            dados: dados as DadosIcone,
          });
        }
        itens.sort((a, b) => a.nome.localeCompare(b.nome));
        setCatalogo(itens);
      })
      .catch(() => {
        if (!cancelado) setFalhou(true);
      });

    return () => {
      cancelado = true;
    };
  }, [aberto, catalogo]);

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase().replace(/\s+/g, "");
    return (catalogo ?? []).filter((item) => item.busca.includes(termo));
  }, [catalogo, busca]);

  return (
    <div className="flex flex-col gap-3 text-zinc-900">
      <div className="flex items-center gap-3">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-zinc-300 bg-white">
          {valor ? (
            <IconeSvg
              dados={valor.dados}
              tamanho={36}
              className="text-zinc-900"
            />
          ) : (
            <span className="px-1 text-center text-[11px] leading-tight text-zinc-400">
              sem ícone
            </span>
          )}
        </div>

        <div className="flex min-w-0 flex-col gap-1">
          <span className="truncate text-sm font-medium">
            {valor ? rotuloDoIcone(valor.nome) : "Nenhum ícone escolhido"}
          </span>
          <div className="flex gap-3 text-sm">
            <button
              type="button"
              onClick={() => setAberto((atual) => !atual)}
              className="cursor-pointer text-blue-700 hover:underline"
            >
              {aberto ? "Fechar" : valor ? "Trocar" : "Escolher ícone"}
            </button>
            {valor && (
              <button
                type="button"
                onClick={() => onChange(null)}
                className="cursor-pointer text-red-600 hover:underline"
              >
                Remover
              </button>
            )}
          </div>
        </div>
      </div>

      {aberto && (
        <div className="flex flex-col gap-2 rounded-md border border-zinc-200 p-3">
          <input
            type="search"
            value={busca}
            onChange={(e) => {
              setBusca(e.target.value);
              setLimite(porPagina);
            }}
            placeholder='Buscar em inglês, exemplo: "building", "book", "clock"...'
            className="rounded-md border border-zinc-300 p-2 text-sm text-zinc-900"
          />

          {falhou ? (
            <p className="text-sm text-red-600">
              Não foi possível carregar os ícones
            </p>
          ) : !catalogo ? (
            <p className="text-sm text-zinc-500">Carregando ícones...</p>
          ) : (
            <>
              <div className="grid max-h-96 grid-cols-3 gap-2 overflow-y-auto pr-1">
                <div className="grid max-h-96 grid-cols-3 gap-2 overflow-y-auto pr-1">
                  {filtrados.slice(0, limite).map((item) => (
                    <button
                      key={item.nome}
                      type="button"
                      title={item.nome}
                      aria-label={item.rotulo}
                      onClick={() => {
                        onChange(limparIcone(item.nome, item.dados));
                        setAberto(false);
                      }}
                      className={`flex cursor-pointer flex-col items-center gap-1 rounded-lg border bg-white p-2 text-zinc-900 hover:bg-zinc-100 ${
                        valor?.nome === item.nome
                          ? "border-blue-600 ring-1 ring-blue-600"
                          : "border-zinc-200"
                      }`}
                    >
                      <IconeSvg
                        dados={item.dados}
                        tamanho={28}
                        className="text-zinc-900"
                      />
                      <span className="w-full truncate text-center text-[10px] leading-tight text-zinc-600">
                        {item.rotulo}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span>
                    {Math.min(limite, filtrados.length)} de {filtrados.length}{" "}
                    ícones
                  </span>
                  {limite < filtrados.length && (
                    <button
                      type="button"
                      onClick={() => setLimite((atual) => atual + porPagina)}
                      className="cursor-pointer text-blue-700 hover:underline"
                    >
                      Mostrar mais
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
