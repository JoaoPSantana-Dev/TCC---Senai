"use client";

import Imagem from "./imagem.componente";

export function Login() {
  return (
    <main className="h-screen w-full overflow-hidden flex flex-col md:flex-row gap-x-10">
      <aside className="hidden md:flex md:w-2/3 bg-white items-center justify-center">
        <Imagem
          nomeImagem="senai-mariano-ferraz.png"
          alt="Foto da entrada da escola SENAI Mariano Ferraz"
        />
      </aside>

      <div className="w-full h-full md:w-1/3 bg-white flex flex-col justify-center p-8 md:p-16 gap-x-10">
        <header className="flex flex-col gap-2 mb-10">
          <h1 className="text-lg font-bold">Login</h1>
          <p className="text-gray-600">
            Entre usando seu CPF e senha cadastrados no sistema
          </p>
        </header>

        <form className="flex flex-col gap-4">
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

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-3xl mt-2 duration-150"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
