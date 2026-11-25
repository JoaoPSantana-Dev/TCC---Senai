"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Pause } from "lucide-react";

interface FundoPersianasProps {
  quantidade?: number; // quantas persianas cobrem a largura da tela
  duracao?: number; // segundos que cada persiana leva para o meio giro
  repetir?: boolean; // se true, abre e fecha em loop (bom para o totem parado)
  pausa?: number;
}

export function FundoPersianas({
  quantidade = 24,
  duracao = 2.8,
  repetir = false,
  pausa = 2.5
}: FundoPersianasProps) {
  const raiz = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const persianas = raiz.current?.querySelectorAll<HTMLElement>("[data-persiana]");

    if (!persianas || persianas.length === 0) return;

    const reduzirMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const contexto = gsap.context(() => {
      // Cada persiana tem a própria perspectiva, assim todas giram iguais
      gsap.set(persianas, { transformPerspective: 900 });

      if (reduzirMovimento) {
        gsap.set(persianas, { rotateY: 180 });
        return;
      };

      const linha = gsap.timeline({
        repeat: repetir ? -1 : 0,
        yoyo: true,
        repeatDelay: pausa
      })

      // Um tween por persiana: é o que deixa a duração independente
      persianas.forEach((persiana, i) => {
        linha.to(persiana, {
          rotateY: 180,
            duration: gsap.utils.random(duracao * 0.8, duracao * 1.2),
            ease: "sine.inOut",
          },
          i * 0.09 + gsap.utils.random(0, 0.35), // Esquerda => Direita;
        );
      });
    }, raiz);

    return () => contexto.revert();
  }, [quantidade, duracao, repetir]);

  return (
    <div
      ref={raiz}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 flex overflow-hidden bg-red-600"
    >
      {Array.from({ length: quantidade }, (_, i) => (
        <div
          key={i}
          data-persiana
          className="h-full bg-zinc-400 backface-hidden"
          // 1px de sobreposição evita frestas vermelhas entre persianas fechadas
          style={{
            flex: "none",
            width: `calc(100% / ${quantidade} +1px)`,
            marginRight: "-1px"
          }}
        />
      ))}
    </div>
  );
}