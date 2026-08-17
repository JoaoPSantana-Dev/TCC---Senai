"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

interface CarrosselProps {
  items: React.ReactNode[];
}

export function NoticiasComponent({ items }: CarrosselProps) {
  // Inicialização do hook da Embla Carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative max-w-4xl mx-auto py-4">
      {/* Viewport (container visível do carrossel) */}
      <div className="overflow-hidden" ref={emblaRef}>
        {/* Container flex com os itens */}
        <div className="flex -ml-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] min-w-0 pl-4 md:flex-[0_0_50%] lg:flex-[0_0_33.33%]"
            >
              <div className="p-4 bg-white border rounded-lg shadow-sm">
                {item}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botões de Navegação */}
      <button
        onClick={scrollPrev}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-gray-800/70 hover:bg-gray-800 text-white p-2 rounded-full z-10 transition-colors"
        aria-label="Item anterior"
      >
        ❮
      </button>
      <button
        onClick={scrollNext}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-gray-800/70 hover:bg-gray-800 text-white p-2 rounded-full z-10 transition-colors"
        aria-label="Próximo item"
      >
        ❯
      </button>
    </div>
  );
}
