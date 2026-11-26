"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { mensagemDoBackend } from "@/lib/autenticacao";
import {
  chamarUsuarios,
  funcoesUsuario,
  opcoesUnidade,
  schemaDadosUsuario,
  type FuncaoUsuario,
  type Usuario,
} from "@/lib/usuarios";
import {
  botaoPrimario,
  botaoSecundario,
  classeCampo,
  classeErro,
  classeRotulo,
} from "./estilos";

// administrador editando os dados de outro usuário que aparece dentro da gaveta

const schema = schemaDadosUsuario.extend({ funcao: z.enum(funcoesUsuario) });
type FormularioData = z.infer<typeof schema>;

const descricaoFuncao: Record<FuncaoUsuario, string> = {
  Administrador: "Edita usuários e páginas",
  Visitante: "Sem acesso de edição",
};

interface FormularioUsuarioProps {
  usuario: Usuario;
  aoSalvar: (usuario: Usuario) => void;
  aoCancelar: () => void;
}

export function FormularioUsuario({
  usuario,
  aoSalvar,
  aoCancelar,
}: FormularioUsuarioProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormularioData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: usuario.nome,
      email: usuario.email,
      unidade: usuario.unidade,
      funcao: usuario.funcao as FuncaoUsuario,
    },
  });

  const onSubmit = async (data: FormularioData) => {
    try {
      const { ok, dados } = await chamarUsuarios(
        String(usuario.idUsuario),
        "PATCH",
        data,
      );

      if (!ok) {
        toast.error(
          mensagemDoBackend(dados, "Não foi possível salvar as alterações"),
        );
        return;
      }

      toast.success("Usuário atualizado!");
      aoSalvar(dados as Usuario);
    } catch {
      toast.error("Falha ao conectar com o servidor");
    }
  };

  const id = `usuario-${usuario.idUsuario}`;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex h-full min-h-0 flex-col"
    >
      {/* só esta área rola, os botões ficam sempre visíveis embaixo */}
      <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-6">
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${id}-nome`} className={classeRotulo}>
            Nome
          </label>
          <input
            id={`${id}-nome`}
            type="text"
            autoComplete="off"
            autoFocus
            aria-invalid={errors.nome ? true : undefined}
            {...register("nome")}
            className={classeCampo}
          />
          {errors.nome && <p className={classeErro}>{errors.nome.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${id}-email`} className={classeRotulo}>
            Email
          </label>
          <input
            id={`${id}-email`}
            type="email"
            autoComplete="off"
            aria-invalid={errors.email ? true : undefined}
            {...register("email")}
            className={classeCampo}
          />
          {errors.email && <p className={classeErro}>{errors.email.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${id}-unidade`} className={classeRotulo}>
            Unidade
          </label>
          <select
            id={`${id}-unidade`}
            aria-invalid={errors.unidade ? true : undefined}
            {...register("unidade")}
            className={classeCampo}
          >
            {opcoesUnidade(usuario.unidade).map((unidade) => (
              <option key={unidade} value={unidade}>
                {unidade}
              </option>
            ))}
          </select>
          {errors.unidade && (
            <p className={classeErro}>{errors.unidade.message}</p>
          )}
        </div>

        <fieldset className="flex flex-col gap-2">
          <legend className={`${classeRotulo} mb-1.5`}>Função</legend>

          {funcoesUsuario.map((funcao) => (
            <label
              key={funcao}
              className="flex cursor-pointer flex-col rounded-2xl border border-zinc-300 px-4 py-3 hover:border-zinc-500 has-checked:border-red-600 has-checked:bg-red-50 has-focus-visible:ring-2 has-focus-visible:ring-red-600/40"
            >
              <input
                type="radio"
                value={funcao}
                {...register("funcao")}
                className="sr-only"
              />
              <span className="font-medium text-zinc-900">{funcao}</span>
              <span className="text-sm text-zinc-600">
                {descricaoFuncao[funcao]}
              </span>
            </label>
          ))}

          <p className="text-sm text-zinc-600">
            Precisa existir pelo menos um administrador.
          </p>
        </fieldset>
      </div>

      <div className="flex gap-3 border-t border-zinc-200 p-4">
        <button
          type="submit"
          disabled={isSubmitting || !isDirty}
          className={botaoPrimario}
        >
          {isSubmitting ? "Salvando..." : "Salvar alterações"}
        </button>
        <button type="button" onClick={aoCancelar} className={botaoSecundario}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
