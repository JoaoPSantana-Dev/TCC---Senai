"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImagemBotaoComponent } from "../../shared/imagem-botao.component";

export function LoginFormComponent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const form = event.currentTarget;
    const email = form.email.value;
    const password = form.senha.value; // Enviado como 'password' para igualar ao cadastro

    try {
      const resposta = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        if (dados.token) {
          localStorage.setItem("token", dados.token);
        }
        router.push("/homepage");
        return;
      }

      form.senha.value = "";
      alert(dados.message || "Credenciais inválidas.");
    } catch (error) {
      alert("Erro ao tentar realizar login.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-6">
      <div className="flex flex-col gap-1">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Digite seu email"
          required
          className="border border-zinc-400 p-4 rounded-2xl"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="senha">Senha</label>
        <input
          type="password"
          name="senha"
          id="senha"
          placeholder="Insira sua senha"
          required
          className="border border-zinc-400 p-4 rounded-2xl"
        />
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={loading}
          className="disabled:opacity-50"
        >
          <ImagemBotaoComponent nomeImagem="login_icon.svg" />
        </button>
      </div>
    </form>
  );
}
