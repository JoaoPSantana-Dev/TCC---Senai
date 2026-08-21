import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import type { Noticia } from "./noticias.data";

interface NoticiaSlideProps {
  noticia: Noticia;
}

export function NoticiaSlide({ noticia }: NoticiaSlideProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0 relative aspect-video flex flex-col justify-end">
        <Image
          src={noticia.imagem}
          alt={noticia.titulo}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          priority
          className="z-0 object-cover"
        />
        <div className="absolute inset-0 z-10" />
        <div className="relative z-20 space-y-2 p-8">
          <h3 className="text-3xl font-bold leading-tight text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">
            {noticia.titulo}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
}
