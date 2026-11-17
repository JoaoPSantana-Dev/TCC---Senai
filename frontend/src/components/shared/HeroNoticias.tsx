"use client";

import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { noticias } from "./Noticias.data";
import Image from "next/image";

const autoplayDelay = 10000;

interface HeroNoticiasProps {
  titulo: string;
}

export function HeroNoticias({ titulo }: HeroNoticiasProps) {
  const autoplayRef = useRef(
    Autoplay({
      delay: autoplayDelay,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    }),
  );
  const [refEmbla, api] = useEmblaCarousel({ loop: true }, [
    autoplayRef.current,
  ]);
  const [atual, setAtual] = useState(0);
  const [tocando, setTocando] = useState(true);

  useEffect(() => {
    if (!api) return;

    const atualizar = () => setAtual(api.selectedScrollSnap());
    atualizar();
    api.on("select", atualizar);

    return () => {
      api.off("select", atualizar);
    };
  }, [api]);

  const pausar = () => {
    autoplayRef.current.stop();
    setTocando(false);
  };

  const retomar = () => {
    autoplayRef.current.play();
    setTocando(true);
  };

  return (
    <section
      aria-label="Notícias"
      className="relative h-[calc(100svh-var(--altura-header,9em))] min-h-96 w-full select-none overflow-hidden bg-transparent"
      onTouchStart={pausar}
      onTouchEnd={retomar}
    >
      <div ref={refEmbla} className="h-full overflow-hidden">
        <div className="flex h-full">
          {noticias.map((noticia, indice) => (
            <div
              key={noticia.id}
              className="relative h-full min-w-0 shrink-0 grow-0 basis-full"
            >
              <Image
                src={noticia.imagem}
                alt=""
                fill
                sizes="100vw"
                priority={indice === 0}
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* escurece a parte de baixo para ler o título */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 via-black/10 to-transparent" />

      <h1 className="pointer-events-none absolute bottom-0 left-0 z-10 max-w-3xl p-8 pb-10 text-4xl font-light leading-tight text-white drop-shadow-lg md:p-12 md:pb-14 md:text-6xl">
        {titulo}
      </h1>

      {/* barra de progresso */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-1.5 bg-white/20">
        <div
          key={atual}
          className="h-full origin-left animate-carousel-progress bg-red-500"
          style={{
            animationDuration: `${autoplayDelay}ms`,
            animationPlayState: tocando ? "running" : "paused",
          }}
        />
      </div>
    </section>
  );
}
