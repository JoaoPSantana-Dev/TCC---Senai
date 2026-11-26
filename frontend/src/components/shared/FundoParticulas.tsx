"use client";

import { useEffect } from "react";
import { tsParticles } from "@tsparticles/engine";
import type { Container, ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

// mesmas props do FundoParticulas: dá para trocar um pelo outro no LayoutPagina
interface FundoTsParticlesProps {
  quantidade?: number; // partículas numa tela Full HD (a densidade ajusta pelo tamanho da tela)
  distancia?: number; // distância máxima (px) para ligar duas partículas com linha
  velocidade?: number; // multiplicador de velocidade (1 = padrão)
  interativo?: boolean; // o cursor/toque liga linhas às partículas próximas
  respeitarMovimentoReduzido?: boolean; // true: fica parado se o sistema pedir
}

const ID = "tsparticles-fundo";

// registra os recursos do tsParticles uma única vez (a página é montada
// de novo a cada navegação, mas o motor só precisa ser preparado uma vez)
let motorPronto: Promise<void> | undefined;

function prepararMotor(): Promise<void> {
  if (!motorPronto) {
    // slim = versão enxuta (links, movimento e interações como o grab)
    motorPronto = loadSlim(tsParticles);
  }
  return motorPronto;
}

// fundo animado com tsParticles: pontos à deriva ligados por linhas
// usa o motor direto (sem o wrapper React), o que evita o ParticlesProvider
export function FundoTsParticles({
  quantidade = 140,
  distancia = 170,
  velocidade = 1,
  interativo = true,
  respeitarMovimentoReduzido = false,
}: FundoTsParticlesProps) {
  useEffect(() => {
    let cancelado = false;
    let container: Container | undefined;

    const parado =
      respeitarMovimentoReduzido &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const opcoes: ISourceOptions = {
      // o canvas fica dentro do nosso div (que já é fixo e atrás do conteúdo)
      fullScreen: { enable: false },
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      detectRetina: true,

      interactivity: {
        // o canvas fica atrás da página, então escutamos o cursor na janela
        detectsOn: "window",
        events: {
          onHover: { enable: interativo, mode: "grab" },
          resize: { enable: true },
        },
        modes: {
          // cursor/toque "agarra" as partículas ao alcance
          grab: {
            distance: 200,
            links: { opacity: 0.8, color: "#ffc23a" },
          },
        },
      },

      particles: {
        // v4: a cor das partículas é definida em "paint" (antes era "color")
        // paleta do SENAI: vermelho e laranja, com pontos brancos de contraste
        paint: {
          color: { value: ["#ff4a1f", "#ff7a1a", "#ffc23a", "#ffffff"] },
          fill: { enable: true },
          stroke: { width: 0 },
        },

        links: {
          enable: true,
          color: "#ff5a28",
          distance: distancia,
          opacity: 0.5,
          width: 1,
        },

        move: {
          enable: !parado,
          direction: "none",
          straight: false,
          // cada ponto com velocidade própria (sem movimento coletivo de onda)
          speed: { min: 0.3 * velocidade, max: 0.8 * velocidade },
          // ao sair por um lado, reaparece pelo lado oposto
          outModes: { default: "out" },
        },

        // a densidade ajusta a quantidade pelo tamanho da tela (base 1920x1080)
        number: { value: quantidade, density: { enable: true } },

        // tamanhos e opacidades variados dão sensação de profundidade
        opacity: {
          value: { min: 0.35, max: 0.9 },
          animation: { enable: !parado, speed: 0.3, sync: false },
        },
        size: { value: { min: 1, max: 3.5 } },
        shape: { type: "circle" },
      },
    };

    prepararMotor()
      .then(() => tsParticles.load({ id: ID, options: opcoes }))
      .then((criado) => {
        // se o componente saiu da tela enquanto carregava, descarta
        if (cancelado) criado?.destroy();
        else container = criado;
      })
      .catch((erro) => console.error("tsParticles:", erro));

    return () => {
      cancelado = true;
      container?.destroy();
    };
  }, [quantidade, distancia, velocidade, interativo, respeitarMovimentoReduzido]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
      // zIndex -1 deixa o fundo ATRÁS do conteúdo da página
      style={{
        zIndex: -1,
        background:
          "linear-gradient(135deg, #2a2630 0%, #1a1216 55%, #0d0a0c 100%)",
      }}
    >
      {/* brilho vermelho na base, mantém a identidade do SENAI */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 110%, rgba(227,6,19,0.35) 0%, transparent 60%)",
        }}
      />

      {/* o tsParticles cria o canvas aqui dentro */}
      <div id={ID} className="absolute inset-0" />

      {/* vinheta: escurece as bordas e dá profundidade */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(0,0,0,0.5) 100%)",
        }}
      />
    </div>
  );
}
