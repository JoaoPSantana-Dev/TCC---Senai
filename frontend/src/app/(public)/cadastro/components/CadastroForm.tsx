"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagemBotao } from "@/components/shared/ImagemBotao";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { InputSenha } from "@/components/shared/InputSenha";
import { mensagemDoBackend, schemaSenhaForte } from "@/lib/autenticacao";
import { apiUrl } from "@/lib/paginas";
import { ChecklistSenha } from "@/components/shared/ChecklistSenha";

// o servidor define o administrador e visitante
const schemaCadastro = z
  .object({
    nome: z.string().min(1, "Nome é obrigatório").max(100),
    email: z.email("Endereço de email inválido"),
    unidade: z.string().min(1, "Unidade é obrigatória"),
    senha: schemaSenhaForte,
    confirmarSenha: z.string().min(1, "Confirme a senha"),
  })
  .refine((dados) => dados.senha === dados.confirmarSenha, {
    message: "As senhas não são iguais",
    path: ["confirmarSenha"],
  });
type CadastroFormData = z.infer<typeof schemaCadastro>;

const classeCampo =
  "border border-zinc-400 hover:border-zinc-800 px-4 py-3 rounded-2xl";

export function CadastroForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CadastroFormData>({
    resolver: zodResolver(schemaCadastro),
    defaultValues: {
      nome: "",
      email: "",
      unidade: "",
      senha: "",
      confirmarSenha: "",
    },
  });

  const senhaDigitada = watch("senha");

  const onSubmit = async (data: CadastroFormData) => {
    try {
      const resposta = await fetch(`${apiUrl}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: data.nome,
          email: data.email,
          unidade: data.unidade,
          senha: data.senha,
        }),
      });
      const dados = await resposta.json().catch(() => ({}));

      if (!resposta.ok) {
        toast.error(mensagemDoBackend(dados, "Erro ao realizar cadastro"));
        return;
      }

      toast.success("Cadastro realizado com sucesso!");
      if (dados.funcao === "Administrador") {
        toast.info(
          "Você foi o primeiro a se cadastrar e entrou como administrador",
        );
      }
      router.push("/login");
    } catch {
      toast.error("Falha ao conectar com o servidor");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-2.5 pt-6"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="nome">Nome</label>
        <input
          id="nome"
          type="text"
          autoComplete="name"
          placeholder="Digite seu nome"
          aria-invalid={errors.nome ? true : undefined}
          {...register("nome")}
          className={classeCampo}
        />
        {errors.nome && (
          <p className="text-red-500 text-sm">{errors.nome.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="Digite seu email"
          aria-invalid={errors.email ? true : undefined}
          {...register("email")}
          className={classeCampo}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="unidade">Unidade</label>
        <select
          id="unidade"
          aria-invalid={errors.unidade ? true : undefined}
          {...register("unidade")}
          className={`${classeCampo} bg-transparent`}
        >
          <option value="" disabled>
            Selecione a unidade SENAI
          </option>
          <option value="SENAI Mariano Ferraz">SENAI Mariano Ferraz</option>
        </select>
        {errors.unidade && (
          <p className="text-red-500 text-sm">{errors.unidade.message}</p>
        )}
      </div>

      <InputSenha
        id="senha"
        rotulo="Senha"
        autoComplete="new-password"
        placeholder="Crie sua senha"
        erro={errors.senha?.message}
        {...register("senha")}
      />
      <ChecklistSenha senha={senhaDigitada ?? ""} />

      <InputSenha
        id="confirmarSenha"
        rotulo="Confirmar senha"
        autoComplete="new-password"
        placeholder="Repita a senha"
        erro={errors.confirmarSenha?.message}
        {...register("confirmarSenha")}
      />

      <div className="flex flex-col text-center">
        <ImagemBotao
          nomeImagem="login_icon.svg"
          texto={isSubmitting ? "Cadastrando..." : "Cadastrar"}
          disabled={isSubmitting}
        />

        <Link href="/login" className="mt-2 hover:text-red-600">
          Voltar para o login
        </Link>
      </div>
    </form>
  );
}
