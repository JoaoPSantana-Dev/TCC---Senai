"use client";

import { ImagemBotaoComponent } from "../../shared/imagem-botao.component";
import { ImagemComponent } from "../../shared/imagem.component";

export default function TelaDescanso() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-[#EAEAEA]">
      <h1 className="mb-8 text-2xl md:text-3xl font-bold text-zinc-800 text-center">
        Bem vido ao SENAI Mariano Ferraz!
      </h1>
      <div className="flex min-h-400px w-400px flex-col items-center justify-center rounded-2xl bg-white p-8 shadow-lg">
        <figure className="mb-12">
          <ImagemComponent
            nomeImagem="senai-logo.png"
            alt="Imagem do logo SENAI"
          />
        </figure>
        <ImagemBotaoComponent
          nomeImagem="botao_login.svg"
          texto="Click para começar"
        />
      </div>
    </main>
  );
}
