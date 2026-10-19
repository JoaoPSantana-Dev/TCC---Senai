"use client";

import Image from "next/image";
import { ImagemBotao } from "@/components/shared/ImagemBotao";
import { useRouter } from "next/navigation";

interface TelaDescansoProps {
  titulo: string;
  nomeImagem: string;
  alt?: string;
  textoBotao: string;
  destino: string;
}

export function TelaDescanso({
  titulo,
  nomeImagem,
  alt = "Imagem",
  textoBotao,
  destino,
}: TelaDescansoProps) {
  const router = useRouter();

  return (
    <>
      <h1 className="mb-8 text-2xl md:text-3xl font-bold text-zinc-800 text-center">
        {titulo}
      </h1>
      <div className="flex min-h-400px w-400px flex-col items-center justify-center rounded-2xl bg-white p-8 shadow-lg">
        <figure className="mb-12">
          <Image
            src={`/${nomeImagem}`}
            alt={alt}
            width={1080}
            height={1920}
            className="w-auto h-auto max-w-full object-contain"
            loading="eager"
          />
        </figure>
        <ImagemBotao
          nomeImagem="login_icon.svg"
          texto={textoBotao}
          onClick={() => router.push(destino)}
          className="md:max-w-1/3 max-w-1/2"
        />
      </div>
    </>
  );
}
