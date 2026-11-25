"use client";

import {
  useEffect,
  useId,
  useRef,
  type KeyboardEvent,
  type ReactNode,
} from "react";

// moldura única das janelas de gerenciamento do editor de notícias, vagas e cursos
// elas ficam no EditorPuck, fora da árvore do puck, então não somem quando o puck troca a seleção
// sem isso o puck desmontava a barra da direita e o que estava aberto ali se perdia

export const classeCampoJanela =
  "w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 hover:border-zinc-500 focus-visible:border-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600/25 aria-invalid:border-red-500";

export const classeBotaoPrimario =
  "cursor-pointer rounded-full bg-red-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

export const classeBotaoSecundario =
  "cursor-pointer rounded-full border border-zinc-300 px-4 py-1.5 text-sm font-medium hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

export const classeLinkAcao =
  "cursor-pointer rounded text-sm font-medium hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600";

interface JanelaEditorProps {
  titulo: string;
  descricao?: string;
  aoFechar: () => void;
  children: ReactNode;
}

export function JanelaEditor({
  titulo,
  descricao,
  aoFechar,
  children,
}: JanelaEditorProps) {
  const idTitulo = useId();
  const botaoFecharRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    botaoFecharRef.current?.focus();
  }, []);

  // esc fecha
  // o modal de confirmação de excluir é outro <dialog> e trata o próprio esc
  function aoTeclar(evento: KeyboardEvent<HTMLDivElement>) {
    if (evento.key === "Escape") aoFechar();
  }

  return (
    <div
      onKeyDown={aoTeclar}
      onMouseDown={(e) => {
        //clique no fundo escurecido fecha
        if (e.target === e.currentTarget) aoFechar();
      }}
      className="fixed inset-0 z-1000 flex items-center justify-center bg-black/40 p-4"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={idTitulo}
        className="flex max-h-full w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white text-zinc-900 shadow-xl"
      >
        <header className="flex items-start justify-between gap-4 border-b border-zinc-200 p-5">
          <div>
            <h2 id={idTitulo} className="text-lg font-semibold">
              {titulo}
            </h2>
            {descricao && <p className="text-sm text-zinc-600">{descricao}</p>}
          </div>
          <button
            ref={botaoFecharRef}
            type="button"
            onClick={aoFechar}
            className={classeBotaoSecundario}
          >
            Fechar
          </button>
        </header>

        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-5">
          {children}
        </div>
      </div>
    </div>
  );
}
