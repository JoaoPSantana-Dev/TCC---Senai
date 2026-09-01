"use client";

import { useRouter } from "next/navigation";
import { ImagemBotaoComponent } from "../../shared/imagem-botao.component";
import { useState } from "react";

export function LoginFormComponent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const form = event.currentTarget;
    const email = form.email.value;
    const senha = form.senha.value;

    try {
      const resposta = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          senha,
        }),
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
      alert(dados.message || "Credenciais inválidas");
    } catch (error) {
      alert("Erro ao tentar realizar login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-6">
      {/* campo para inserir o Email do usuário. */}
      <div className="flex flex-col gap-1 ">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Digite seu email"
          //maxLength={14}
          //inputMode="numeric"
          required
          className="border border-zinc-400 hover:border-zinc-800 p-4 rounded-2xl"
        />
      </div>

      {/* campo para inserir a senha do usuário. */}
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

      {/* botão de envio do formulário de autenticação. */}
      <div className="flex justify-center">
        <ImagemBotaoComponent nomeImagem="login_icon.svg" texto="Entrar" />
      </div>
    </form>
  );
}
