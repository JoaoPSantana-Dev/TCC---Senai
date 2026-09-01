"use client";

import { useRouter } from "next/navigation";
import ImagemBotaoComponent from "../../shared/imagem-botao.component";

export function LoginFormComponent() {
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;


    const email = form.email.value;
    const senha = form.senha.value;

    const resposta = await fetch("http://localhost:3001/login",{
      method: "POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        senha,
      }),
    });

    const dados = await resposta.json();

    if(resposta.ok){
      router.push("/homepage");
      return
    };

    form.email.value = "";
    form.senha.value="";
    alert(dados.message);

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
        <ImagemBotaoComponent nomeImagem="login_icon.svg" />
      </div>
    </form>
  );
}
