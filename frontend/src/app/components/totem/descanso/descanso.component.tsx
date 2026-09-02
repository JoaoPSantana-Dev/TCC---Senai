"use client";

import { ImagemBotaoComponent } from "../../shared/imagem-botao.component";
import { ImagemComponent } from "../../shared/imagem.component";

export function TelaDescanso() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center">
      <h1 className="mb-8 text-2xl md:text-3xl font-bold text-zinc-800 text-center">
        Bem vindo ao SENAI Mariano Ferraz!
      </h1>
      <div className="flex min-h-400px w-400px flex-col items-center justify-center rounded-2xl bg-white p-8 shadow-lg">
        <figure className="mb-12">
          <ImagemComponent
            nomeImagem="senai-logo.png"
            alt="Imagem do logo SENAI"
            width={1080}
            height={1920}
          />
        </figure>
        <ImagemBotaoComponent
          nomeImagem="login_icon.svg"
          texto="Clique para começar"
          className="md:max-w-1/3 max-w-1/2"
        />
      </div>
    </main>
  );
}
