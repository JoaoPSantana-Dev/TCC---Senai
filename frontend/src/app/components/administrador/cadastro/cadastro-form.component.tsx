"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { router } from "next/client";
import { ImagemBotaoComponent } from "../../shared/imagem-botao.component";

const schemaCadastro = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  funcao: z.string().min(1, "Função é obrigatória"),
  unidade: z.string().min(1, "Unidade é obrigatória"),
  email: z.email("Endereço de email inválido"),
  senha: z.string().min(8, "Senha precisa ter no mínimo 8 caracteres"),
});

type CadastroFormData = z.infer<typeof schemaCadastro>;

export function CadastroFormComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CadastroFormData>({
    resolver: zodResolver(schemaCadastro),
    defaultValues: {
      nome: "",
      funcao: "",
      unidade: "",
      email: "",
      senha: "",
    },
  });

  const onSubmit = async (data: CadastroFormData) => {
    try {
      const resposta = await fetch("http://localhost:3001/usuarios", {
        method: "POST",
        headers: { "Content-Type": "applications/json" },
        body: JSON.stringify(data),
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        alert("Cadastro realizado com sucesso");
        router.push("/login");
      } else {
        alert(dados.message || "Erro ao realizar cadastro");
      }
    } catch (error) {
      alert("Falha ao conectar com o servidor");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 pt-6"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="nome">Nome</label>
        <input
          id="nome"
          type="text"
          placeholder="Digite seu nome"
          {...register("nome")}
          className="border border-zinc-400 hover:border-zinc-800 p-4 rounded-2xl"
        />
        {errors.nome && (
          <p className="text-red-500 text-sm">{errors.nome.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="funcao">Função</label>
        <input
          id="funcao"
          type="text"
          placeholder="Digite seu cargo"
          {...register("funcao")}
          className="border border-zinc-400 hover:border-zinc-800 p-4 rounded-2xl"
        />
        {errors.funcao && (
          <p className="text-red-500 text-sm">{errors.funcao.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="unidade">Unidade</label>
        <input
          id="unidade"
          type="text"
          placeholder="Digite a unidade SENAI"
          {...register("unidade")}
          className="border border-zinc-400 hover:border-zinc-800 p-4 rounded-2xl"
        />
        {errors.unidade && (
          <p className="text-red-500 text-sm">{errors.unidade.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="border border-zinc-400 hover:border-zinc-800 p-4 rounded-2xl"
          placeholder="Digite seu email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="senha">Senha</label>
        <input
          id="senha"
          type="senha"
          {...register("senha")}
          className="border border-zinc-400 hover:border-zinc-800 p-4 rounded-2xl"
          placeholder="Digite sua senha"
        />
        {errors.senha && (
          <p className="text-red-500 text-sm">{errors.senha.message}</p>
        )}
      </div>

      <div className="flex justify-center">
        <ImagemBotaoComponent
          nomeImagem="login_icon.svg"
          texto={isSubmitting ? "Cadastrando..." : "Cadastrar"}
          disabled={isSubmitting}
        />
      </div>
    </form>
  );
}
