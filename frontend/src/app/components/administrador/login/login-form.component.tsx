"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ImagemBotaoComponent } from "../../shared/imagem-botao.component";

const schemaLogin = z.object({
  email: z.email("Endereço de email invalido"),
  senha: z.string().min(8, "Senha precisa ter no mínimo 8 caracteres"),
});

type LoginFormData = z.infer<typeof schemaLogin>;


export function LoginFormComponent() {
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isSubmitting},
  } = useForm<LoginFormData>({
    resolver: zodResolver(schemaLogin),
    defaultValues:{
      email: "",
      senha: "",
    },
  });

  const onSubmit = async(data: LoginFormData)=>{
     try {
      const resposta = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dados = await resposta.json();

      if(resposta.ok){
        router.push("/homepage");
        return;
      }
      else{
        alert(dados.message || "Erro ao realizar login");
        reset();
      } 
  }
  catch(erro){
    alert("Falha ao conectar com o servidor");
  }
}

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 pt-6">
      {/* campo para inserir o Email do usuário. */}
      <div className="flex flex-col gap-1 ">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register("email")}
          //maxLength={14}
          //inputMode="numeric"
          required
          className="border border-zinc-400 hover:border-zinc-800 p-4 rounded-2xl"
          placeholder="Digite seu email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}"</p>
        )}
      </div>

      {/* campo para inserir a senha do usuário. */}
      <div className="flex flex-col gap-1">
        <label htmlFor="senha">Senha</label>
        <input
          id="senha"
          type="password"
          {...register("senha")}
          required
          className="border border-zinc-400 hover:border-zinc-800 p-4 rounded-2xl"
          placeholder="Insira sua senha"
        />
        {errors.senha && (
          <p className="text-red-500 text-sm">{errors.senha.message}</p>
        )}
      </div>

      {/* botão de envio do formulário de autenticação. */}
      <div className="flex justify-center">
        <ImagemBotaoComponent nomeImagem="login_icon.svg" texto="Entrar" />
      </div>
    </form>
  );

}