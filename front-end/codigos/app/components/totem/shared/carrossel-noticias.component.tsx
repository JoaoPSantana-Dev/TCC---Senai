"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { type CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { NoticiaSlide } from "./noticia-slide.component";
import { noticias } from "./noticias.data";

const AUTOPLAY_DELAY = 10000;

export function CarrosselNoticiasComponent() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(true);

  const autoplayRef = React.useRef(
    Autoplay({
      delay: AUTOPLAY_DELAY,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    }),
  );

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleTouchStart = () => {
    autoplayRef.current.stop();
    setIsPlaying(false);
  };

  const handleTouchEnd = () => {
    autoplayRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div
      className="w-full max-w-5xl mx-auto px-12 py-6 space-y-4 select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Carousel
        setApi={setApi}
        plugins={[autoplayRef.current]}
        className="w-full"
        opts={{ loop: true }}
      >
        <CarouselContent>
          {noticias.map((noticia) => (
            <CarouselItem key={noticia.id}>
              <NoticiaSlide noticia={noticia} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="h-12 w-12 -left-14" />
        <CarouselNext className="h-12 w-12 -right-14" />
      </Carousel>

      {/* barra de progresso */}
      <div className="flex justify-center w-full">
        <div className="w-1/3 bg-muted rounded-full h-2 overflow-hidden">
          <div
            key={current}
            className={`bg-primary h-full rounded-full animate-carousel-progress origin-left ${
              !isPlaying ? "paused" : ""
            }`}
            style={{ animationDuration: `${AUTOPLAY_DELAY}ms` }}
          />
        </div>
      </div>
    </div>
  );
}
