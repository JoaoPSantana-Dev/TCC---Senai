"use client";

import { PaginaRenderizada } from "@/components/shared/PaginaRenderizada";
import type { ComponentePagina } from "@/lib/paginas";
import { useEffect, useState } from "react";

interface Rascunho {
  slug: string;
  nomePagina: string;
  conteudo: ComponentePagina[];
}

// só funciona dentro do iframe do editor, recebe o rascunho por postMessage
export default function PreVisualizacaoPagina() {
  const [rascunho, setRascunho] = useState<Rascunho | null>(null);

  useEffect(() => {
    if (window.parent === window) return; // aberta direto no navegador

    const origem = window.location.origin;
    let recebeu = false;

    const receber = (evento: MessageEvent) => {
      if (evento.origin !== origem || evento.source !== window.parent) return;

      const dados = evento.data;
      if (dados?.tipo !== "rascunho-pagina") return;

      recebeu = true;
      setRascunho({
        slug: String(dados.slug),
        nomePagina: String(dados.nomePagina),
        conteudo: Array.isArray(dados.conteudo) ? dados.conteudo : [],
      });
    };

    window.addEventListener("message", receber);

    // avisa o editor que carregou e repete até chegar o primeiro rascunho
    // porque o editor pode ainda não estar escutando
    const avisar = () =>
      window.parent.postMessage({ tipo: "pre-visualizacao-pronta" }, origem);
    avisar();
    const intervalo = setInterval(() => {
      if (recebeu) clearInterval(intervalo);
      else avisar();
    }, 300);

    return () => {
      clearInterval(intervalo);
      window.removeEventListener("message", receber);
    };
  }, []);

  if (!rascunho) return null;

  // inert: links e botões do preview não fazem nada
  return (
    <div inert className="w-full">
      <PaginaRenderizada
        slug={rascunho.slug}
        nomePagina={rascunho.nomePagina}
        conteudo={rascunho.conteudo}
      />
    </div>
  );
}
