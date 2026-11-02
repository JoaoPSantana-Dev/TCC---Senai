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

// administrador editando os dados de outro usuário

const schema = schemaDadosUsuario.extend({ funcao: z.enum(funcoesUsuario) });
type FormularioData = z.infer<typeof schema>;

const classeCampo =
  "w-full border border-zinc-400 hover:border-zinc-800 px-4 py-2 rounded-2xl bg-white";

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
      className="flex flex-col gap-4 rounded-2xl bg-zinc-50 p-4"
    >
      <h3 className="font-semibold text-zinc-800">Editando {usuario.nome}</h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor={`${id}-nome`}>Nome</label>
          <input
            id={`${id}-nome`}
            type="text"
            autoComplete="off"
            aria-invalid={errors.nome ? true : undefined}
            {...register("nome")}
            className={classeCampo}
          />
          {errors.nome && (
            <p className="text-sm text-red-500">{errors.nome.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={`${id}-email`}>Email</label>
          <input
            id={`${id}-email`}
            type="email"
            autoComplete="off"
            aria-invalid={errors.email ? true : undefined}
            {...register("email")}
            className={classeCampo}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={`${id}-unidade`}>Unidade</label>
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
            <p className="text-sm text-red-500">{errors.unidade.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor={`${id}-funcao`}>Função</label>
          <select
            id={`${id}-funcao`}
            {...register("funcao")}
            className={classeCampo}
          >
            {funcoesUsuario.map((funcao) => (
              <option key={funcao} value={funcao}>
                {funcao}
              </option>
            ))}
          </select>
          <p className="text-xs text-zinc-500">
            Administradores podem editar usuários e páginas. Precisa existir
            pelo menos um
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting || !isDirty}
          className="cursor-pointer rounded-3xl bg-red-600 px-5 py-2 text-white duration-150 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Salvando..." : "Salvar alterações"}
        </button>
        <button
          type="button"
          onClick={aoCancelar}
          className="cursor-pointer rounded-3xl border border-zinc-400 px-5 py-2 hover:bg-zinc-100"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
