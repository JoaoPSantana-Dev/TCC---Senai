"use client";

import BotaoLoginComponent from "./imagem-botao.component";
import ImagemLogoComponent from "./imagem.logo.component";

export default function TelaDescanso() {
  return (
    <main className="flex h-screen w-screen items-center justify-center bg-white">
      <div className="flex min-h-400px w-400px flex-col items-center justify-center rounded-2xl bg-zinc-300 p-8 shadow-lg">
        <figure className="mb-12">
          <ImagemLogoComponent nomeImagem="senai-logo.png" alt="Imagem do logo SENAI" />
        </figure>
        <BotaoLoginComponent href="/login" nomeImagem="botao_login.svg" texto="Click para começar"/>
      </div>
    </main>
  );
}
