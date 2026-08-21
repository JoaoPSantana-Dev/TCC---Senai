"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { type CarouselApi } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const noticias = [
  {
    id: 1,
    titulo: "Notícia 1",
    imagem: "/tubarao.png",
  },
  {
    id: 2,
    titulo: "Notícia 2",
    imagem: "/tubarao.png",
  },
];

const AUTOPLAY_DELAY = 5000;

export function CarrosselComponent() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(true);

  const autoplayRef = React.useRef(
    Autoplay({ delay: AUTOPLAY_DELAY, stopOnInteraction: false }),
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
      onMouseEnter={handleTouchStart}
      onMouseLeave={handleTouchEnd}
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
              <Card className="overflow-hidden border-2 shadow-lg">
                <CardContent className="p-0 relative aspect-video flex flex-col justify-end">
                  <Image
                    src={noticia.imagem}
                    alt={noticia.titulo}
                    fill
                    priority
                    className="z-0 object-cover"
                  />
                  <div className="absolute inset-0 z-10 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

                  <div className="relative z-20 space-y-2 p-8 text-white">
                    <h2 className="text-3xl font-bold leading-tight">
                      {noticia.titulo}
                    </h2>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="h-12 w-12 -left-14" />
        <CarouselNext className="h-12 w-12 -right-14" />
      </Carousel>

      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <div
          key={current}
          className={`bg-primary h-full rounded-full animate-carousel-progress origin-left ${
            !isPlaying ? "paused" : ""
          }`}
          style={{ animationDuration: `${AUTOPLAY_DELAY}ms` }}
        />
      </div>
    </div>
  );
}
