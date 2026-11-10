"use client";

import { useForm, type FieldErrors, type Resolver } from "react-hook-form";
import { toast } from "sonner";
import { mensagemDoBackend } from "@/lib/autenticacao";
import {
  chamarVagas,
  corpoParaEnviar,
  validarVaga,
  valoresIniciais,
  type ConfigVaga,
  type RegistroVaga,
} from "@/lib/vagasAdmin";

type Valores = Record<string, string>;

const classeCampo =
  "w-full border border-zinc-400 hover:border-zinc-800 px-4 py-2 rounded-2xl bg-white";

interface FormularioVagaProps {
  config: ConfigVaga;
  registro?: RegistroVaga; // sem registro = criando
  aoSalvar: (registro: RegistroVaga) => void;
  aoCancelar: () => void;
}

export function FormularioVaga({
  config,
  registro,
  aoSalvar,
  aoCancelar,
}: FormularioVagaProps) {
  const editando = registro !== undefined;
  const id = editando ? Number(registro[config.idCampo]) : null;

  // a validação é a de lib/vagasAdmin.ts (mesmas regras dos DTOs do backend)
  const resolver: Resolver<Valores> = async (valores) => {
    const erros = validarVaga(config, valores);
    if (Object.keys(erros).length === 0) return { values: valores, errors: {} };

    return {
      values: {},
      errors: Object.fromEntries(
        Object.entries(erros).map(([campo, message]) => [
          campo,
          { type: "validate", message },
        ]),
      ) as FieldErrors<Valores>,
    };
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<Valores>({
    resolver,
    defaultValues: valoresIniciais(config, registro),
  });

  const onSubmit = async (valores: Valores) => {
    try {
      const corpo = corpoParaEnviar(config, valores);
      const { ok, dados } = editando
        ? await chamarVagas(`${config.tipo}/${id}`, "PATCH", corpo)
        : await chamarVagas(config.tipo, "POST", corpo);

      if (!ok) {
        toast.error(mensagemDoBackend(dados, "Não foi possível salvar"));
        return;
      }

      toast.success(
        editando ? "Alterações salvas!" : "Cadastrado com sucesso!",
      );
      aoSalvar(dados as RegistroVaga);
    } catch {
      toast.error("Falha ao conectar com o servidor");
    }
  };

  const prefixo = `vaga-${config.tipo}-${id ?? "nova"}`;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-4 rounded-2xl bg-zinc-50 p-4"
    >
      <h3 className="font-semibold text-zinc-800">
        {editando ? "Editando" : config.tituloNovo}
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {config.campos.map((campo) => (
          <div
            key={campo.nome}
            className={`flex flex-col gap-1 ${campo.tipo === "textarea" ? "md:col-span-2" : ""}`}
          >
            <label htmlFor={`${prefixo}-${campo.nome}`}>
              {campo.rotulo}
              {campo.obrigatorio && <span className="text-red-600"> *</span>}
            </label>

            {campo.tipo === "textarea" ? (
              <textarea
                id={`${prefixo}-${campo.nome}`}
                rows={4}
                aria-invalid={errors[campo.nome] ? true : undefined}
                {...register(campo.nome)}
                className={classeCampo}
              />
            ) : (
              <input
                id={`${prefixo}-${campo.nome}`}
                type="text"
                autoComplete="off"
                aria-invalid={errors[campo.nome] ? true : undefined}
                {...register(campo.nome)}
                className={classeCampo}
              />
            )}

            {errors[campo.nome] && (
              <p className="text-sm text-red-500">
                {String(errors[campo.nome]?.message)}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting || (editando && !isDirty)}
          className="cursor-pointer rounded-3xl bg-red-600 px-5 py-2 text-white duration-150 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting
            ? "Salvando..."
            : editando
              ? "Salvar alterações"
              : "Cadastrar"}
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
