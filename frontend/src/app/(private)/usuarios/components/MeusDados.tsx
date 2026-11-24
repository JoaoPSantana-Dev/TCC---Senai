"use client";

import * as z from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ChecklistSenha } from "@/components/shared/ChecklistSenha";
import { InputSenha } from "@/components/shared/InputSenha";
import { mensagemDoBackend, schemaSenhaForte } from "@/lib/autenticacao";
import {
  chamarUsuarios,
  opcoesUnidade,
  schemaDadosUsuario,
  type Usuario,
} from "@/lib/usuarios";
import { Avatar, SeloFuncao } from "./Selos";
import {
  botaoPrimario,
  classeCampo,
  classeCartao,
  classeErro,
  classeRotulo,
  focoVisivel,
} from "./estilos";

// o administrador logado editando os próprios dados e a própria senha

interface MeusDadosProps {
  eu: Usuario;
  aoAtualizar: (usuario: Usuario) => void;
}

export function MeusDados({ eu, aoAtualizar }: MeusDadosProps) {
  return (
    <section
      aria-labelledby="meus-dados"
      className={`${classeCartao} scroll-mt-6`}
    >
      <header className="flex flex-wrap items-center gap-4 border-b border-zinc-200 p-6">
        <Avatar
          nome={eu.nome}
          administrador={eu.funcao === "Administrador"}
          tamanho="lg"
        />

        <div className="flex flex-1 flex-wrap items-center gap-3">
          <h2 id="meus-dados" className="text-lg font-semibold">
            Meus dados
          </h2>
          <SeloFuncao funcao={eu.funcao} />
        </div>

        <p className="text-sm text-zinc-600">
          Verificação em duas etapas:{" "}
          <Link
            href="/seguranca"
            className={`rounded font-medium text-red-700 hover:underline ${focoVisivel}`}
          >
            {eu.totpAtivo ? "ativa, gerencie aqui" : "desativada, ative aqui"}
          </Link>
        </p>
      </header>

      <div className="grid gap-10 p-6 lg:grid-cols-2">
        <DadosPessoais eu={eu} aoAtualizar={aoAtualizar} />
        <TrocarSenha />
      </div>
    </section>
  );
}

// ---------- nome, email e unidade ----------

const schemaPerfil = schemaDadosUsuario.extend({ senhaAtual: z.string() });
type PerfilData = z.infer<typeof schemaPerfil>;

function DadosPessoais({ eu, aoAtualizar }: MeusDadosProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setError,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<PerfilData>({
    resolver: zodResolver(schemaPerfil),
    defaultValues: {
      nome: eu.nome,
      email: eu.email,
      unidade: eu.unidade,
      senhaAtual: "",
    },
  });

  // a senha atual só é pedida quando o email muda
  const emailMudou = watch("email").trim().toLowerCase() !== eu.email;

  const onSubmit = async (data: PerfilData) => {
    if (emailMudou && !data.senhaAtual) {
      setError("senhaAtual", {
        message: "Informe a senha atual para trocar o email",
      });
      return;
    }

    try {
      const { ok, dados } = await chamarUsuarios("eu", "PATCH", {
        nome: data.nome,
        email: data.email,
        unidade: data.unidade,
        senhaAtual: emailMudou ? data.senhaAtual : undefined,
      });

      if (!ok) {
        toast.error(
          mensagemDoBackend(dados, "Não foi possível salvar seus dados"),
        );
        return;
      }

      const atualizado = dados as Usuario;
      toast.success("Seus dados foram atualizados!");
      reset({ ...data, email: atualizado.email, senhaAtual: "" });
      aoAtualizar(atualizado);
    } catch {
      toast.error("Falha ao conectar com o servidor");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5"
    >
      <h3 className="font-semibold text-zinc-900">Dados pessoais</h3>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="eu-nome" className={classeRotulo}>
          Nome
        </label>
        <input
          id="eu-nome"
          type="text"
          autoComplete="name"
          aria-invalid={errors.nome ? true : undefined}
          {...register("nome")}
          className={classeCampo}
        />
        {errors.nome && <p className={classeErro}>{errors.nome.message}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="eu-email" className={classeRotulo}>
          Email
        </label>
        <input
          id="eu-email"
          type="email"
          autoComplete="email"
          aria-invalid={errors.email ? true : undefined}
          {...register("email")}
          className={classeCampo}
        />
        {errors.email && <p className={classeErro}>{errors.email.message}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="eu-unidade" className={classeRotulo}>
          Unidade
        </label>
        <select
          id="eu-unidade"
          {...register("unidade")}
          className={classeCampo}
        >
          {opcoesUnidade(eu.unidade).map((unidade) => (
            <option key={unidade} value={unidade}>
              {unidade}
            </option>
          ))}
        </select>
      </div>

      {emailMudou && (
        <InputSenha
          id="eu-senha-para-email"
          rotulo="Senha atual (necessária para trocar o email)"
          autoComplete="current-password"
          erro={errors.senhaAtual?.message}
          {...register("senhaAtual")}
        />
      )}

      <button
        type="submit"
        disabled={isSubmitting || !isDirty}
        className={`${botaoPrimario} self-start`}
      >
        {isSubmitting ? "Salvando..." : "Salvar meus dados"}
      </button>
    </form>
  );
}

// ---------- senha ----------

const schemaTrocaSenha = z
  .object({
    senhaAtual: z.string().min(1, "Informe a senha atual"),
    novaSenha: schemaSenhaForte,
    confirmarSenha: z.string().min(1, "Confirme a nova senha"),
  })
  .refine((dados) => dados.novaSenha === dados.confirmarSenha, {
    message: "As senhas não conferem",
    path: ["confirmarSenha"],
  });
type TrocaSenhaData = z.infer<typeof schemaTrocaSenha>;

function TrocarSenha() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TrocaSenhaData>({
    resolver: zodResolver(schemaTrocaSenha),
    defaultValues: { senhaAtual: "", novaSenha: "", confirmarSenha: "" },
  });

  const novaSenha = watch("novaSenha");

  const onSubmit = async (data: TrocaSenhaData) => {
    try {
      const { ok, dados } = await chamarUsuarios("eu/senha", "POST", {
        senhaAtual: data.senhaAtual,
        novaSenha: data.novaSenha,
      });

      if (!ok) {
        toast.error(
          mensagemDoBackend(dados, "Não foi possível alterar a senha"),
        );
        return;
      }

      toast.success("Senha alterada com sucesso!");
      reset();
    } catch {
      toast.error("Falha ao conectar com o servidor");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-5 lg:border-l lg:border-zinc-200 lg:pl-10"
    >
      <h3 className="font-semibold text-zinc-900">Alterar senha</h3>

      <InputSenha
        id="eu-senha-atual"
        rotulo="Senha atual"
        autoComplete="current-password"
        erro={errors.senhaAtual?.message}
        {...register("senhaAtual")}
      />

      <div className="flex flex-col gap-2">
        <InputSenha
          id="eu-nova-senha"
          rotulo="Nova senha"
          autoComplete="new-password"
          erro={errors.novaSenha?.message}
          {...register("novaSenha")}
        />
        <ChecklistSenha senha={novaSenha ?? ""} />
      </div>

      <InputSenha
        id="eu-confirmar-senha"
        rotulo="Confirmar nova senha"
        autoComplete="new-password"
        erro={errors.confirmarSenha?.message}
        {...register("confirmarSenha")}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className={`${botaoPrimario} self-start`}
      >
        {isSubmitting ? "Alterando..." : "Alterar senha"}
      </button>
    </form>
  );
}
