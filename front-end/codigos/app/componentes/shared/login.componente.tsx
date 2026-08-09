"use client";

import Imagem from "./imagem.componente";

export function Login() {
  return (
    <main className="flex flex-col md:flex-row min-h-screen w-full gap-x-10">
      <aside className="w-full md:w-1/2 bg-white flex items-center justify-center">
        <Imagem />
      </aside>

      <div className="w-full md:w-1/2 bg-white flex flex-col justify-center p-8 md:p-16 gap-x-10">
        <header className="flex flex-col gap-2 mb-6">
          <h1 className="text-2xl font-bold">Login</h1>
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
              className="border p-2 rounded"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              name="senha"
              placeholder="Insira sua senha"
              required
              className="border p-2 rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-2"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
