"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { focoVisivel } from "./estilos";

interface GavetaEdicaoProps {
  aberta: boolean;
  titulo: string;
  descricao?: string;
  aoFechar: () => void;
  children: ReactNode;
}

// painel que desliza da direita, feito com <dialog>
// o navegador já cuida do esc, do foco preso dentro do painel e do fundo escurecido
export function GavetaEdicao({
  aberta,
  titulo,
  descricao,
  aoFechar,
  children,
}: GavetaEdicaoProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogo = ref.current;
    if (!dialogo) return;

    if (aberta && !dialogo.open) dialogo.showModal();
    if (!aberta && dialogo.open) dialogo.close();
  }, [aberta]);

  // trava a rolagem da página enquanto o painel está aberto
  useEffect(() => {
    if (!aberta) return;
    const anterior = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = anterior;
    };
  }, [aberta]);

  return (
    <dialog
      ref={ref}
      aria-labelledby="titulo-gaveta"
      onClose={aoFechar}
      // clique no fundo escurecido fecha
      // o alvo é o <dialog>
      onClick={(e) => {
        if (e.target === ref.current) aoFechar();
      }}
      className="m-0 ml-auto h-dvh max-h-dvh w-full max-w-md bg-transparent p-0 backdrop:bg-black/40 open:animate-in open:slide-in-from-right motion-reduce:open:animate-none"
    >
      <div className="flex h-full flex-col bg-white">
        <header className="flex items-start justify-between gap-4 border-b border-zinc-200 p-6">
          <div className="min-w-0">
            <h2
              id="titulo-gaveta"
              className="text-lg font-semibold text-zinc-900"
            >
              {titulo}
            </h2>
            {descricao && (
              <p className="truncate text-sm text-zinc-600">{descricao}</p>
            )}
          </div>
          <button
            type="button"
            onClick={aoFechar}
            aria-label="Fechar"
            className={`cursor-pointer rounded-full p-2 text-zinc-600 hover:bg-zinc-100 ${focoVisivel}`}
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </header>

        <div className="min-h-0 flex-1">{aberta && children}</div>
      </div>
    </dialog>
  );
}
