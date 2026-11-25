"use client";

import { useEffect, useMemo, useState, type MouseEvent } from "react";
import type { LucideIcon } from "lucide-react";
import type { IconeMenu } from "@/lib/paginas";
import { limparIcone, rotuloDoIcone } from "@/lib/iconeSvg";
import { IconeSvg } from "@/components/shared/IconeSvg";

// escolhe um ícone entre todos os do Lucide
// cada ícone aparece desenhado, com o nome embaixo
// a lista inteira só é baixada quando o seletor é aberto pela primeira vez
// ao escolher, os traços do svg que o lucide desenhou são copiados e salvos como { nome, dados },
// então a página pública não precisa carregar o catálogo todo, e o backend continua igual

const porPagina = 48;

interface ItemCatalogo {
  nome: string;
  rotulo: string;
  busca: string;
  Componente: LucideIcon;
}

// "stroke-width" vira "strokeWidth", que é como os dados do ícone são guardados
function paraCamelCase(nome: string) {
  return nome.replace(/-([a-z])/g, (_, letra: string) => letra.toUpperCase());
}

// lê os traços (path, circle, ...) do svg que o lucide acabou de desenhar no botão
function lerDadosDoSvg(svg: SVGSVGElement | null) {
  if (!svg) return [];
  return Array.from(svg.children).map((elemento) => {
    const atributos: Record<string, string> = {};
    for (const { name, value } of Array.from(elemento.attributes)) {
      atributos[paraCamelCase(name)] = value;
    }
    return [elemento.tagName.toLowerCase(), atributos] as const;
  });
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
    import("lucide-react")
      .then(({ icons }) => {
        if (cancelado) return;

        const itens: ItemCatalogo[] = Object.entries(icons).map(
          ([nome, Componente]) => ({
            nome,
            rotulo: rotuloDoIcone(nome),
            busca: nome.toLowerCase(),
            Componente,
          }),
        );
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
              <div className="flex flex-col gap-3">
                <div className="grid max-h-96 grid-cols-3 gap-2 overflow-y-auto pr-1">
                  {filtrados.slice(0, limite).map((item) => (
                    <button
                      key={item.nome}
                      type="button"
                      title={item.nome}
                      aria-label={item.rotulo}
                      onClick={(evento: MouseEvent<HTMLButtonElement>) => {
                        const svg = evento.currentTarget.querySelector("svg");
                        const icone = limparIcone(item.nome, lerDadosDoSvg(svg));
                        if (icone.dados.length === 0) return;
                        onChange(icone);
                        setAberto(false);
                      }}
                      className={`flex cursor-pointer flex-col items-center gap-1 rounded-lg border bg-white p-2 text-zinc-900 hover:bg-zinc-100 ${
                        valor?.nome === item.nome
                          ? "border-blue-600 ring-1 ring-blue-600"
                          : "border-zinc-200"
                      }`}
                    >
                      <item.Componente
                        size={28}
                        aria-hidden="true"
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
