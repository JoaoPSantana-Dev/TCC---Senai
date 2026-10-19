"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ComponentePagina } from "@/lib/paginas";

// tamanho da tela do totem, ajuste se precisar trocar
const larguraTotem = 1080;
const alturaTotem = 1920;

interface PreVisualizacaoProps {
  slug: string;
  nomePagina: string;
  conteudo: ComponentePagina[];
}

export function PreVisualizacaoTotem({
  slug,
  nomePagina,
  conteudo,
}: PreVisualizacaoProps) {
  const caixaRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [escala, setEscala] = useState(0.6);

  // encolhe o iframe que tem o tamanho real do totem para caber na coluna
  useEffect(() => {
    const caixa = caixaRef.current;
    if (!caixa) return;

    const observador = new ResizeObserver(([entrada]) => {
      setEscala(Math.min(1, entrada.contentRect.width / larguraTotem));
    });
    observador.observe(caixa);
    return () => observador.disconnect();
  }, []);

  const enviar = useCallback(() => {
    iframeRef.current?.contentWindow?.postMessage(
      { tipo: "rascunho-pagina", slug, nomePagina, conteudo },
      window.location.origin,
    );
  }, [slug, nomePagina, conteudo]);

  // manda o rascunho toda vez que algo mudar no editor
  useEffect(() => {
    enviar();
  }, [enviar]);

  // também manda o rascunho quando o iframe avisar que terminou de carregar
  useEffect(() => {
    const ouvir = (evento: MessageEvent) => {
      if (evento.origin !== window.location.origin) return;
      if (evento.source !== iframeRef.current?.contentWindow) return;
      if (evento.data?.tipo === "pre-visualizacao-pronta") enviar();
    };

    window.addEventListener("message", ouvir);
    return () => window.removeEventListener("message", ouvir);
  }, [enviar]);

  return (
    <div
      ref={caixaRef}
      className="w-full overflow-hidden rounded-xl border border-zinc-300 bg-white"
      style={{ height: alturaTotem * escala }}
    >
      <iframe
        ref={iframeRef}
        src="/pre-visualizacao-pagina"
        title="Pré-visualização da página"
        style={{
          width: larguraTotem,
          height: alturaTotem,
          transform: `scale(${escala})`,
          transformOrigin: "top left",
          border: 0,
        }}
      />
    </div>
  );
}
