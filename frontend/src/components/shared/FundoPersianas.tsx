"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface FundoPersianasProps {
  quantidade?: number; // quantas persianas cobrem a largura da tela
  duracao?: number; // segundos que cada persiana leva para o meio giro
  repetir?: boolean; // abre e fecha em loop; false = abre uma vez e fica aberto
  pausa?: number; // segundos parado (aberto e fechado) entre os ciclos
  respeitarMovimentoReduzido?: boolean
}

// fundo animado: persianas cinza que giram (meio giro) da esquerda para a
// direita, cada uma com tempo próprio, formando uma onda e expondo o vermelho
export function FundoPersianas({
  quantidade = 24,
  duracao = 2.8,
  repetir = true,
  pausa = 2.5,
  respeitarMovimentoReduzido = false
}: FundoPersianasProps) {
  const raiz = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const persianas =
      raiz.current?.querySelectorAll<HTMLElement>("[data-persiana]");
    if (!persianas || persianas.length === 0) return;

    const reduzirMovimento =
      respeitarMovimentoReduzido &&
      window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

    // gsap.context + revert limpa tudo ao desmontar (e no strict mode do React)
    const contexto = gsap.context(() => {
      // cada persiana tem a própria perspectiva, assim todas giram iguais
      gsap.set(persianas, { transformPerspective: 900 });

      if (reduzirMovimento) return

      // uma timeline única mantém a onda sincronizada a cada ciclo:
      // abre (esquerda → direita), espera, e fecha de volta (yoyo)
      const linha = gsap.timeline({
        repeat: repetir ? -1 : 0,
        yoyo: true,
        repeatDelay: pausa,
      });

      // um tween por persiana: duração e início próprios = movimento independente
      persianas.forEach((persiana, i) => {
        linha.to(
          persiana,
          {
            rotateY: 180,
            duration: gsap.utils.random(duracao * 0.8, duracao * 1.2),
            ease: "sine.inOut",
          },
          i * 0.09 + gsap.utils.random(0, 0.35),
        );
      });
    }, raiz);

    return () => contexto.revert();
  }, [quantidade, duracao, repetir, pausa, respeitarMovimentoReduzido]);

  return (
    <div
      ref={raiz}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 flex overflow-hidden bg-red-600"
      style={{ zIndex: -1 }}
    >
      {Array.from({ length: quantidade }, (_, i) => (
        <div
          key={i}
          data-persiana
          className="h-full bg-zinc-400"
          // 1px de sobreposição evita frestas vermelhas entre persianas fechadas
          style={{
            flex: "none",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            width: `calc(100% / ${quantidade} + 1px)`,
            marginRight: "-1px",
          }}
        />
      ))}
    </div>
  );
}
