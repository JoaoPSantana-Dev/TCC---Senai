"use client";

import { useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import {
  imagemEhDeUpload,
  urlImagemNoticia,
  useNoticias,
} from "@/lib/noticias";

const autoplayDelay = 10000;

export function HeroNoticias() {
  const { noticias, carregando } = useNoticias();
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

  // sem notícias ou ainda carregando, mantém a mesma altura para a página não pular
  if (noticias.length === 0) {
    return (
      <section
        aria-label="Notícias"
        className="flex h-[calc(100svh-var(--altura-header,9em))] min-h-96 w-full items-center justify-center bg-zinc-800 text-xl text-white/70"
      >
        {carregando ? null : "Nenhuma notícia cadastrada no momento..."}
      </section>
    );
  }

  return (
    <section
      aria-label="Notícias"
      className="relative h-[calc(100svh-var(--altura-header,9em))] min-h-96 w-full select-none overflow-hidden"
      onTouchStart={pausar}
      onTouchEnd={retomar}
    >
      <div ref={refEmbla} className="h-full overflow-hidden">
        <div className="flex h-full">
          {noticias.map((noticia, indice) => (
            <div
              key={noticia.idNoticia}
              className="relative h-full min-w-0 shrink-0 grow-0 basis-full"
            >
              <Image
                src={urlImagemNoticia(noticia.imagem)}
                unoptimized={imagemEhDeUpload(noticia.imagem)}
                alt={noticia.titulo}
                fill
                sizes="100vw"
                priority={indice === 0}
                className="object-cover"
              />
              {/* escurece a parte de baixo para ler o título */}
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 via-black/10 to-transparent" />

              <h1 className="pointer-events-none absolute bottom-0 left-0 z-10 max-w-4xl p-8 pb-10 text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-tight text-white drop-shadow-lg md:p-12 md:pb-14">
                {noticia.titulo}
              </h1>
            </div>
          ))}
        </div>
      </div>

      {/* barra de progresso */}
      <div className="absolute inset-x-80 bottom-8 z-10 h-1 bg-white/20">
        <div
          key={atual}
          className="h-1 origin-left animate-carousel-progress bg-red-500"
          style={{
            animationDuration: `${autoplayDelay}ms`,
            animationPlayState: tocando ? "running" : "paused",
          }}
        />
      </div>
    </section>
  );
}
