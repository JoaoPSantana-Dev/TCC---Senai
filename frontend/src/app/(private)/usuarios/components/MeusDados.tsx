"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ChecklistSenha } from "@/components/shared/ChecklistSenha";
import { mensagemDoBackend, schemaSenhaForte } from "@/lib/autenticacao";
import {
  chamarUsuarios,
  opcoesUnidade,
  schemaDadosUsuario,
  type Usuario,
} from "@/lib/usuarios";
import { InputSenha } from "@/components/shared/InputSenha";

// o administrador logado editando os próprios dados e a própria senha

const classeCampo =
  "w-full border border-zinc-400 hover:border-zinc-800 px-4 py-2 rounded-2xl bg-white";
const classeBotao =
  "cursor-pointer rounded-3xl bg-red-600 px-5 py-2 text-white duration-150 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50";

interface MeusDadosProps {
  eu: Usuario;
  aoAtualizar: (usuario: Usuario) => void;
}

export function MeusDados({ eu, aoAtualizar }: MeusDadosProps) {
  return (
    <section
      aria-labelledby="meus-dados"
      className="flex flex-col gap-6 rounded-2xl border-2 border-zinc-200 p-6"
    >
      <div className="flex items-center gap-3">
        <h2 id="meus-dados" className="text-lg font-semibold">
          Meus dados
        </h2>
        <span className="rounded-full bg-red-100 px-3 py-0.5 text-sm font-medium text-red-800">
          {eu.funcao}
        </span>
      </div>

      <DadosPessoais eu={eu} aoAtualizar={aoAtualizar} />
      <TrocarSenha />
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
      className="flex flex-col gap-4"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="eu-nome">Nome</label>
          <input
            id="eu-nome"
            type="text"
            autoComplete="name"
            aria-invalid={errors.nome ? true : undefined}
            {...register("nome")}
            className={classeCampo}
          />
          {errors.nome && (
            <p className="text-sm text-red-500">{errors.nome.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="eu-email">Email</label>
          <input
            id="eu-email"
            type="email"
            autoComplete="email"
            aria-invalid={errors.email ? true : undefined}
            {...register("email")}
            className={classeCampo}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="eu-unidade">Unidade</label>
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
          <div className="md:col-span-2">
            <InputSenha
              id="eu-senha-para-email"
              rotulo="Senha atual (necessária para trocar o email)"
              autoComplete="current-password"
              erro={errors.senhaAtual?.message}
              {...register("senhaAtual")}
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !isDirty}
        className={`${classeBotao} self-start`}
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
      className="flex flex-col gap-4 border-t border-zinc-200 pt-6"
    >
      <h3 className="font-medium">Alterar senha</h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <InputSenha
            id="eu-senha-atual"
            rotulo="Senha atual"
            autoComplete="current-password"
            erro={errors.senhaAtual?.message}
            {...register("senhaAtual")}
          />
        </div>

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
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`${classeBotao} self-start`}
      >
        {isSubmitting ? "Alterando..." : "Alterar senha"}
      </button>
    </form>
  );
}
