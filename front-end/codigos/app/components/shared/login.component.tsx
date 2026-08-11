"use client";

import Imagem from "./imagem.component";
import BotaoLogin from "./imagem-botao.component";
import { ImagemLogin } from "./imagem-login.component";

export function LoginComponent() {
  return (
    <main className="h-screen w-full overflow-hidden flex flex-col md:flex-row">
      <ImagemLogin />

      <section className="w-full h-full md:w-1/3 bg-white flex flex-col justify-between p-8 md:p-16">
        <header className="flex flex-col gap-2">
          <figure className="mb-32">
            <Imagem nomeImagem="senai-logo.png" alt="Imagem do logo SENAI" />
          </figure>

          <h1 className="text-lg font-bold">Login</h1>
          <p className="text-gray-600">
            Entre usando seu CPF e senha cadastrados no sistema
          </p>
        </header>

        <form className="flex flex-col gap-4 mb-auto pt-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="cpf">CPF</label>
            <input
              type="text"
              name="cpf"
              placeholder="___.___.___-__"
              maxLength={14}
              inputMode="numeric"
              required
              className="border border-zinc-400 hover:border-zinc-800 p-4 rounded-2xl"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              name="senha"
              placeholder="Insira sua senha"
              required
              className="border border-zinc-400 hover:border-zinc-800 p-4 rounded-2xl"
            />
          </div>

          <BotaoLogin nomeImagem="botao_login.svg" />
        </form>
      </section>
    </main>
  );
}
