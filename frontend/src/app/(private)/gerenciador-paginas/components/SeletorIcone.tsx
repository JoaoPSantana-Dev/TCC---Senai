"use client";

import { useEffect, useMemo, useState } from "react";
import { HugeiconsIcon, type HugeiconsIconProps } from "@hugeicons/react";
import type { IconeMenu } from "@/lib/paginas";

type Icone = HugeiconsIconProps["icon"];
const maximoNaTela = 60;

// tira o "key" que vem dentro do ícone
function limparicone(icone: Icone): Icone {
  return icone.map(([tag, atributos]) => [
    tag,
    Object.fromEntries(
      Object.entries(atributos).filter(([chave]) => chave !== "key"),
    ),
  ]) as unknown as Icone;
}

interface SeletorIconeProps {
  valor: IconeMenu | null;
  onChange: (icone: IconeMenu | null) => void;
}

export function SeletorIcone({ valor, onChange }: SeletorIconeProps) {
  const [aberto, setAberto] = useState(false);
  const [busca, setBusca] = useState("");
  const [catalogo, setCatalogo] = useState<[string, Icone][] | null>(null);

  // o pacote de ícones inteiro só é baixado quando o seletor é aberto pela primeira vez
  useEffect(() => {
    if (!aberto || catalogo) return;

    let cancelado = false;
    import("@hugeicons/core-free-icons").then((modulo) => {
      if (cancelado) return;
      setCatalogo(
        Object.entries(modulo)
          .filter(
            ([nome, icone]) => nome.endsWith("Icon") && Array.isArray(icone),
          )
          .sort(([a], [b]) => a.localeCompare(b)) as [string, Icone][],
      );
    });
    return () => {
      cancelado = true;
    };
  }, [aberto, catalogo]);

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase().replace(/\s+/g, "");
    return (catalogo ?? []).filter(([nome]) =>
      nome.toLowerCase().includes(termo),
    );
  }, [catalogo, busca]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setAberto((atual) => !atual)}
          className="flex cursor-pointer items-center gap-2 rounded-md border border-zinc-300 px-3 py-2 text-sm hover:bg-zinc-100"
        >
          {valor && <HugeiconsIcon icon={valor.dados} size={22} />}
          {valor ? valor.nome : "Escolher ícone"}
        </button>
        {valor && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="cursor-pointer text-sm text-red-600 hover:underline"
          >
            Remover
          </button>
        )}
      </div>

      {aberto && (
        <div className="flex flex-col gap-2 rounded-md border border-zinc-200 p-3">
          <input
            type="search"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder='Buscar em inglês, exemplo: "building", "book", "clock"...'
            className="rounded-md border p-2 text-sm"
          />

          {!catalogo ? (
            <p className="text-sm text-zinc-500">Carregando ícones...</p>
          ) : (
            <>
              <div className="grid grid-cols-6 gap-2 sm:grid-cols-10">
                {filtrados.slice(0, maximoNaTela).map(([nome, icone]) => (
                  <button
                    key={nome}
                    type="button"
                    title="nome"
                    onClick={() => {
                      onChange({ nome, dados: limparicone(icone) });
                      setAberto(false);
                    }}
                    className={`flex cursor-pointer items-center justify-center rounded-md border p-2 hover:bg-zinc-100 ${
                      valor?.nome === nome
                        ? "border-blue-600 bg-blue-50"
                        : "border-zinc-200"
                    }`}
                  >
                    <HugeiconsIcon icon={icone} size={24} />
                  </button>
                ))}
              </div>
              <p className="text-xs text-zinc-500">
                Mostrando {Math.min(maximoNaTela, filtrados.length)} de{" "}
                {filtrados.length} ícones
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
