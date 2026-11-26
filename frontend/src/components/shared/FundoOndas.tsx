"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface FundoOndasProps {
  duracao?: number;
  respeitarMovimentoReduzido?: boolean;
}

// Geometria-Inicio
const LARGURA = 1600;
const ALTURA = 900;
const PASSO = 20;
const DOIS_PI = Math.PI * 2;

interface Faixa {
  y: number;
  inclinacao: number;
  amplitude: number;
  comprimento: number;
  espessura: number;
  opacidade: number;
  brilho: number;
  fase: number;
  velocidade: number;
  preenchimento: [string, string, string];
  borda: [string, string];
}

const FAIXAS: Faixa[] = [
  {
    y: 0.34,
    inclinacao: -0.3,
    amplitude: 90,
    comprimento: 1500,
    espessura: 520,
    opacidade: 0.55,
    brilho: 0.25,
    fase: 0,
    velocidade: 0.8,
    preenchimento: ["#2b0a14", "#7a0d1c", "#3a0b16"],
    borda: ["#ff6a2a", "#ff9a3a"],
  },
  {
    y: 0.5,
    inclinacao: -0.42,
    amplitude: 110,
    comprimento: 1350,
    espessura: 420,
    opacidade: 0.7,
    brilho: 0.55,
    fase: 1.1,
    velocidade: 1,
    preenchimento: ["#5c0a17", "#c4121f", "#7a0c18"],
    borda: ["#ff7a1a", "#ffc23a"],
  },
  {
    y: 0.6,
    inclinacao: -0.5,
    amplitude: 120,
    comprimento: 1250,
    espessura: 340,
    opacidade: 0.9,
    brilho: 1,
    fase: 2.2,
    velocidade: 0.9,
    preenchimento: ["#8a0f1a", "#e8281e", "#b01220"],
    borda: ["#ffa526", "#fff2a8"],
  },
  {
    y: 0.66,
    inclinacao: -0.46,
    amplitude: 105,
    comprimento: 1200,
    espessura: 150,
    opacidade: 0.85,
    brilho: 0.9,
    fase: 3,
    velocidade: 1.1,
    preenchimento: ["#c2121f", "#ff4a1f", "#d0161f"],
    borda: ["#ffcf4d", "#fff6c8"],
  },
  {
    y: 0.78,
    inclinacao: -0.32,
    amplitude: 80,
    comprimento: 1450,
    espessura: 300,
    opacidade: 0.38,
    brilho: 0.4,
    fase: 4,
    velocidade: 0.85,
    preenchimento: ["#3a0912", "#a00f1c", "#4a0a14"],
    borda: ["#ff6a2a", "#ffb03a"],
  },
  {
    y: 0.88,
    inclinacao: -0.2,
    amplitude: 60,
    comprimento: 1100,
    espessura: 220,
    opacidade: 0.25,
    brilho: 0.3,
    fase: 5.2,
    velocidade: 1.2,
    preenchimento: ["#2b0a14", "#8d0f1e", "#3a0b16"],
    borda: ["#ff6a2a", "#ff9a3a"],
  },
];

const X_INICIO = -100;
const X_FIM = LARGURA + 100;
const PONTOS = Math.floor((X_FIM - X_INICIO) / PASSO) + 1;

// calcula o contorno de uma faixa num instante da animação, gravando nos
// buffers (evita criar arrays a cada quadro)
// "fase" vai de 0 a 2π; todos os termos usam múltiplos inteiros dela,
// então ao chegar em 2π o desenho é idêntico ao do início (loop sem corte)
function calcular(
  faixa: Faixa,
  fase: number,
  xs: Float32Array,
  topo: Float32Array,
  base: Float32Array,
) {
  for (let i = 0; i < PONTOS; i++) {
    const x = X_INICIO + i * PASSO;
    const u = x / LARGURA;

    const centro =
      ALTURA * (faixa.y + faixa.inclinacao * (u - 0.5)) +
      faixa.amplitude * Math.sin((DOIS_PI * x) / faixa.comprimento - fase) +
      faixa.amplitude *
        0.35 *
        Math.sin((DOIS_PI * x) / (faixa.comprimento * 0.55) - 2 * fase + 1.3);

    // a espessura varia ao longo da faixa: onde afina, parece o tecido torcendo
    const torcao =
      0.5 +
      0.5 * Math.sin((DOIS_PI * x) / (faixa.comprimento * 0.9) - fase + 2.1);
    const meia = (faixa.espessura * (0.14 + 0.86 * torcao)) / 2;

    xs[i] = x;
    topo[i] = centro - meia;
    base[i] = centro + meia;
  }
}
// GEOMETRIA-FIM

// "#rrggbb" -> "rgba(r,g,b,a)"
function rgba(hex: string, alfa: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alfa})`;
}

// traça uma curva suave (quadrática pelos pontos médios) pelos pontos dados
function curva(
  ctx: CanvasRenderingContext2D,
  xs: Float32Array,
  ys: Float32Array,
  inverso: boolean,
  continuar: boolean,
) {
  const n = xs.length;
  const k = (i: number) => (inverso ? n - 1 - i : i);

  if (continuar) ctx.lineTo(xs[k(0)], ys[k(0)]);
  else ctx.moveTo(xs[k(0)], ys[k(0)]);

  for (let i = 1; i < n - 1; i++) {
    const x = xs[k(i)];
    const y = ys[k(i)];
    ctx.quadraticCurveTo(
      x,
      y,
      (x + xs[k(i + 1)]) / 2,
      (y + ys[k(i + 1)]) / 2,
    );
  }
  ctx.lineTo(xs[k(n - 1)], ys[k(n - 1)]);
}

// fundo animado: faixas de tecido vermelho com bordas luminosas, ondulando
// da esquerda para a direita, cada uma no seu ritmo
// desenhado em <canvas>: o navegador não precisa reprocessar SVG a cada quadro
export function FundoOndas({
  duracao = 14,
  respeitarMovimentoReduzido = false,
}: FundoOndasProps) {
  const raiz = useRef<HTMLDivElement>(null);
  const tela = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = tela.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduzirMovimento =
      respeitarMovimentoReduzido &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // buffers e gradientes de cada faixa (criados uma vez)
    const faixas = FAIXAS.map((faixa) => {
      const area = ctx.createLinearGradient(0, 0, LARGURA, 0);
      area.addColorStop(0, faixa.preenchimento[0]);
      area.addColorStop(0.6, faixa.preenchimento[1]);
      area.addColorStop(1, faixa.preenchimento[2]);

      // a borda some nas pontas e brilha no meio, como no tecido
      const borda = ctx.createLinearGradient(0, 0, LARGURA, 0);
      borda.addColorStop(0, rgba(faixa.borda[0], 0));
      borda.addColorStop(0.35, rgba(faixa.borda[0], 1));
      borda.addColorStop(0.7, rgba(faixa.borda[1], 1));
      borda.addColorStop(1, rgba(faixa.borda[1], 0));

      return {
        ...faixa,
        gradienteArea: area,
        gradienteBorda: borda,
        xs: new Float32Array(PONTOS),
        topo: new Float32Array(PONTOS),
        base: new Float32Array(PONTOS),
        progresso: 0, // 0 → 2π, animado pelo gsap
      };
    });

    const dimensionar = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
    };

    const desenhar = () => {
      const w = canvas.width;
      const h = canvas.height;
      if (w === 0 || h === 0) return;

      // equivale ao preserveAspectRatio="slice": preenche a tela, cortando o excesso
      const escala = Math.max(w / LARGURA, h / ALTURA);
      ctx.setTransform(
        escala,
        0,
        0,
        escala,
        (w - LARGURA * escala) / 2,
        (h - ALTURA * escala) / 2,
      );
      ctx.clearRect(-LARGURA, -ALTURA, LARGURA * 3, ALTURA * 3);
      ctx.lineJoin = "round";
      ctx.lineCap = "round";

      for (const f of faixas) {
        calcular(f, f.progresso + f.fase, f.xs, f.topo, f.base);

        // tecido
        ctx.globalAlpha = f.opacidade;
        ctx.fillStyle = f.gradienteArea;
        ctx.beginPath();
        curva(ctx, f.xs, f.topo, false, false);
        curva(ctx, f.xs, f.base, true, true);
        ctx.closePath();
        ctx.fill();

        // borda inferior, mais discreta
        ctx.strokeStyle = f.gradienteBorda;
        ctx.globalAlpha = f.brilho * 0.35;
        ctx.lineWidth = 2;
        ctx.beginPath();
        curva(ctx, f.xs, f.base, false, false);
        ctx.stroke();

        // borda luminosa em 3 camadas: halo largo, brilho médio e fio de luz
        ctx.beginPath();
        curva(ctx, f.xs, f.topo, false, false);
        for (const [largura, alfa] of [
          [28, 0.28],
          [10, 0.45],
          [3, 1],
        ]) {
          ctx.globalAlpha = f.brilho * alfa;
          ctx.lineWidth = largura;
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
    };

    dimensionar();
    desenhar();

    const observador = new ResizeObserver(() => {
      dimensionar();
      desenhar();
    });
    observador.observe(canvas);

    // se o sistema pede menos movimento, fica o desenho inicial (parado)
    if (reduzirMovimento) return () => observador.disconnect();

    // gsap.context + revert limpa tudo ao desmontar (e no strict mode)
    const contexto = gsap.context(() => {
      faixas.forEach((faixa, i) => {
        // um tween por faixa: cada uma tem a própria velocidade
        gsap.to(faixa, {
          progresso: DOIS_PI,
          duration: duracao / FAIXAS[i].velocidade,
          ease: "none",
          repeat: -1,
        });
      });
      gsap.ticker.add(desenhar);
    }, raiz);

    return () => {
      gsap.ticker.remove(desenhar);
      contexto.revert();
      observador.disconnect();
    };
  }, [duracao, respeitarMovimentoReduzido]);

  return (
    <div
      ref={raiz}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
      // zIndex -1 deixa o fundo ATRÁS do conteúdo da página
      style={{
        zIndex: -1,
        background:
          "linear-gradient(135deg, #2a2630 0%, #1a1216 55%, #0d0a0c 100%)",
      }}
    >
      <canvas ref={tela} className="absolute inset-0 h-full w-full" />

      {/* vinheta: escurece as bordas e dá profundidade */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, transparent 10%, rgba(0,0,0,0.18) 65%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* sombreamento no topo e na base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.18), transparent 25%, transparent 75%, rgba(0,0,0,0.22))",
        }}
      />
    </div>
  );
}
